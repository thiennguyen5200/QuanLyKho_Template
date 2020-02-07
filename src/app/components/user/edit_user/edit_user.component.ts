import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { UpdateUserAction } from 'src/app/ngrx-store/actions/user.action';
import { DialogData } from 'src/app/ngrx-store/models/user.model';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit_user',
  templateUrl: './edit_user.component.html',
  styleUrls: ['./edit_user.component.css']
})
export class Edit_userComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  messager: string;
  status: boolean;
  titleStatus: string;

  getNameErrorMessage() {
     if(this.name.hasError('required')) {
       return 'Bạn chưa nhập tên!'
     };
  }
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Bạn chưa nhập email!' :
        this.email.hasError('email') ? 'Email không hợp lệ' :
            '';
  }
  getPhoneErrorMessage() {
    if(this.phone.hasError('required')){
      return 'Bạn chưa nhập số điện thoại!'
    } else if(this.phone.hasError('maxLength')) {
      return 'Độ dài số phải trên 10 số'
    }
  }
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<Edit_userComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.status = data.status
      if(this.status === true) {
        this.titleStatus = 'Kích hoạt';
      } else {
        this.titleStatus = "Không kích hoạt";
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  updateUser(data: DialogData): void{
    data.status = this.status;
    this.store.dispatch(new UpdateUserAction(data));
    this.loading$ = this.store.select(store => store.user.loading);
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.user.error);
    setTimeout(()=>{
      this.error$.subscribe(err => {
        if(err){
          this.messager = err.message;
        } else {
          this.messager = 'Cập nhập thành công!'
          this.dialogRef.close();
        }
        this.openSnackBar(this.messager);
      });
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
