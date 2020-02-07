import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DialogData, User } from 'src/app/ngrx-store/models/user.model';
import { AddUserAction } from 'src/app/ngrx-store/actions/user.action';

@Component({
  selector: 'app-create_user',
  templateUrl: './create_user.component.html',
  styleUrls: ['./create_user.component.css']
})
export class Create_userComponent {
  formCreateUser: FormGroup;
  
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  messager: string;
  user$: Observable<Array<User>>
  user: Array<User>;
  _isCheckAccount: Boolean;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<Create_userComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.formCreateUser = this.fb.group({
        name : ['', [Validators.required]],
        account : ['', [Validators.required]],
        pass : ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        phone : ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      })
      this.user$ = store.select(state => state.user.list)
      this.user$.subscribe(data => this.user = data)
    }
  //   getAccountErrorMessage() {
  //     if(this.name.hasError('required')) {
  //       return 'Bạn chưa nhập tài khoản!'
  //     };
  //  }
  //  getPassErrorMessage() {
  //    if(this.name.hasError('required')) {
  //      return 'Bạn chưa nhập mật khẩu!'
  //    };
  //  }
  //  getNameErrorMessage() {
  //    if(this.name.hasError('required')) {
  //      return 'Bạn chưa nhập tên!'
  //    };
  //  }
  //  getEmailErrorMessage() {
  //    return this.email.hasError('required') ? 'Bạn chưa nhập email!' :
  //        this.email.hasError('email') ? 'Email không hợp lệ' :
  //            '';
  //  }
  //  getPhoneErrorMessage() {
  //    if(this.phone.hasError('required')){
  //      return 'Bạn chưa nhập số điện thoại!'
  //    } else if(this.phone.hasError('maxLength')) {
  //      return 'Độ dài số phải trên 10 số'
  //    }
  //  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  checkAccount(){
    const index:User = this.user.find(x => x.account === this.data.account)
    if(index){
      this.formCreateUser.controls['account'].setErrors({'incorrect': true})
      this._isCheckAccount = true;
    } else {
      this._isCheckAccount = false;
    }
  }
  createUser(data: DialogData){
    console.log('createUser')
    this.store.dispatch(new AddUserAction(data));
    this.loading$ = this.store.select(store => store.user.loading);
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.user.error);
    setTimeout(()=>{
      this.error$.subscribe(err => {
        console.log(err);
        if(err){
          this.messager = err.message;
        } else {
          this.messager = 'Thêm tài khoản thành công!'
          this.dialogRef.close();
        }
      });
      this.openSnackBar(this.messager);
    },1)
  }

  openSnackBar(message:string){
    let vertical: MatSnackBarVerticalPosition = "top";
    let horizon: MatSnackBarHorizontalPosition = "right";
    const config = new MatSnackBarConfig();
    config.verticalPosition = vertical;
    config.horizontalPosition = horizon;
    config.duration = 5000;
    this.snackBar.open(message,'' ,config);
  }

}
