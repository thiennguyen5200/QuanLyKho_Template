import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JWTService } from './JWTService';
import { AppState } from '../ngrx-store/models/app-state.model';
import { Store } from '@ngrx/store';
import { ServerResponse, URL } from '../ngrx-store/models/types.model';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
_token: any
constructor(
  private http: HttpClient,
  private router: Router,
  private jwtService: JWTService,
  private store: Store<AppState>,
  private userService: UserService
) { 
  this._token = this.getToken;
  if(!this._token) {
    this.userService.logout();
    alert('Session time out. Moi dang nhap lai!');
  }
}

getAllProduct(){
  const token = this._token 
  const headers = new HttpHeaders({ token });
  return this.http.get(`${URL}product`,{headers}).toPromise()
  .then((result: ServerResponse)=>{
    if(result.code === 1) {
      return result.data;
    } else {
      return null;
    }
  })
}
public get getToken(){
  return localStorage.getItem('_token');
}

createProduct(name: string, amount: number){
  const token = this._token 
  const headers = new HttpHeaders({ token });
  return this.http.post(`${URL}product/create-product`,{
    product_name: name,
    price: 0,
    describe: null,
    product_img: null,
    amount: amount
  }, {headers}).pipe(map((result: ServerResponse)=>{
    if(result.code === 1) {
      return result;
    } else {
      throw new Error(result.message);
    }
  }))

}

updateProductName(id: string, name: string, amount: number) {
  const token = this.getToken;
  const headers = new HttpHeaders({ token });
  // if(user.account === 'admin') {
    return this.http.put(`${URL}product/update-product/${id}`,
      {
        product_name: name,
        amount: amount
      },
      { headers}
    ).pipe(map((result: ServerResponse) => {
        return result
    }))
}

updateProductAmount(id: string, amount: number) {
  const token = this.getToken;
  const headers = new HttpHeaders({ token });
  return this.http.put(`${URL}product/update-product-amount/${id}`,
    { amount: amount },
    { headers}
  ).pipe(map(result=> result))
}

deleteProduct(id){
  const token = this.getToken;
  const headers = new HttpHeaders({ token });
  // const user = this.getAccount;
  // if(user.level === 1 && user.account === 'admin'){
    return this.http.delete(`${URL}product/delete-product/${id}`,{headers})
    .pipe(map(result => result));
  // } else {
  //   throw new Error('Bạn không có quyền xóa người này!')
  // }
}


}

