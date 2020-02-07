import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { Store } from '@ngrx/store';
import { AddAccountAction } from 'src/app/ngrx-store/actions/account.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm: FormGroup;
  message: string;
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    })
    if(this.userService.getToken){
      const url = this.location.path();
      console.log(url)
      this.router.navigateByUrl(`${url}`);
    }
  }

  onSignIn(){
    const {account, password } = this.signInForm.value;
    this.store.dispatch(new AddAccountAction(account, password));
    this.loading$ = this.store.select(state => state.account.loading);
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(state => state.account.error);
    this.error$.subscribe(err => {
      if(err) {
        this.message = err.message;
      }
    });
    // this.userService.signIn(account, password)
    // .catch(err => this.message = err.message)
  }

}
