import { Injectable } from '@angular/core';
import { User } from '../ngrx-store/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerResponse, URL } from '../ngrx-store/models/types.model';
import { JWTService } from './JWTService';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx-store/models/app-state.model';
import { DeleteAccountAction } from '../ngrx-store/actions/account.action';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: User;
constructor(
  private http: HttpClient,
  private router: Router,
  private jwtService: JWTService,
  private store: Store<AppState>,
) { }

signIn(account: string, password: string){
  const payload = { account: account, password: password };
  const jwt = this.jwtService.sign(payload)
  if (jwt) {
    return this.http.post(`${URL}manager/user/signinToken`,{ jwt: jwt })
    .pipe(map(data => data));
  }
}

async getAllUser(){
  return this.http.get(`${URL}manager/user/`).toPromise()
  .then((result: ServerResponse)=>{
    if(result.code === 1) {
      return result.data;
    } else {
      return false;
    }
  })
}

verifyAccount(jwt: any){
  const user: User = this.jwtService.verify(jwt);
  // this.store.dispatch(new AddAccountAction(user))
  return user;
}

public get getToken(){
  return localStorage.getItem('_token');
}

public get getAccount(){
  const account = localStorage.getItem('_account');
  const user = this.verifyAccount(account)
  return user;
}
createUser(account: string, name: string, pass: string, email: string, phone: string){
  const token = this.getToken;
  if(!token){
    this.logout();
  }
  const headers = new HttpHeaders({ token });
  return this.http.post(`${URL}manager/user/register`,{
    account: account,
    name: name,
    password: pass,
    email: email,
    phone: phone
  },{headers}).pipe(map((result: ServerResponse) => {
    if(result.code === 1) {
      return result;
    } else {
      throw new Error(result.message);
    }
  }))
}
updateUser(id: string, name: string, email: string, phone: string, status: boolean) {
  const token = this.getToken;
  if(!token){
    this.logout();
  }
  // const account = localStorage.getItem('_account');
  const user = this.getAccount
  const headers = new HttpHeaders({ token });
  if(user.account === 'admin') {
    return this.http.put(`${URL}manager/user/update_user/${id}`,
      {name: name, email: email, phone: phone, status: status},
      { headers}
    ).pipe(map((result: ServerResponse) => {
      if (result.code === 1) {
        return result.data
      }
    }))
  } else {
    if (id === user._id) {
      return this.http.put(`${URL}manager/user/update_user/${id}`,
        {name: name, email: email, phone: phone},
        { headers}
      ).pipe(map((result: ServerResponse) => {
        if (result.code === 1) {
          return result.data
        }
      }))
    } else {
      throw new Error('Bạn không có quyền chỉnh sửa người này!')
    }
  }
}


deleteUser(id){
  const token = this.getToken;
  const headers = new HttpHeaders({ token });
  const user = this.getAccount;
  if(user.level === 1 && user.account === 'admin'){
    return this.http.delete(`${URL}manager/user/delete-user/${id}`,{headers})
    .pipe(map(result => result));
  } else {
    throw new Error('Bạn không có quyền xóa người này!')
  }
}

async check(){
  const token = localStorage.getItem('_token');
  if(!token){
    localStorage.removeItem('_account');
    this.store.dispatch(new DeleteAccountAction())
    return this.router.navigateByUrl('/signin');
  }
  const headers = new HttpHeaders({ token });
  console.log(headers)
  return this.http.post(`${URL}manager/user/check`, {}, { headers } )
  .toPromise()
  .then((result: ServerResponse)=>{
    if(result.code === 1){
      if(result.data.status === false) {
        // this.logout();
        return false;
      }
      return true
      // this.store.dispatch(new AddAccountAction(result.data));
    }
    else{
      // invalid token
      // this.logout();
      return false;
    }
  });
}

logout() {
  localStorage.removeItem('_token');
  localStorage.removeItem('_account');
  this.store.dispatch(new DeleteAccountAction())
  return this.router.navigateByUrl('/signin');
}
}
