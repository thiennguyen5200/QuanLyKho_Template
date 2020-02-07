import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './ngrx-store/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx-store/models/app-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Quản Lý Kho';
  user$: Observable<User>;
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  messager: string;
  accountUser: User;
  _isValis: boolean;
  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ){
  }

  ngOnInit(): void {
    this.userService.check().then(result =>{
      if(result === false){
        this.accountUser = null;
        this.Logout()
      }
    });
    this.user$ = this.store.select(state => state.account.list)
    this.user$.subscribe(data =>{
      console.log(data)
      if(data === null){
        const jwt = localStorage.getItem('_account')
        const token = localStorage.getItem('_token')
        if(jwt && token){
          this.accountUser = this.userService.verifyAccount(jwt)
        } else {
          this.Logout()
        }
      } else {
        this.accountUser = data
      }
    })

    this.loading$ = this.store.select(state => state.account.loading)
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.user.error);
    this.error$.subscribe(err => {
      if(err){
        this.messager = err.message;
      }
    });
  }
  
  Logout(){
    this.accountUser = null
    this.userService.logout()
  }
}
