import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Edit_userComponent } from '../../user/edit_user/edit_user.component';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Product } from 'src/app/ngrx-store/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateProductAction } from 'src/app/ngrx-store/actions/product.action';
import { map } from 'rxjs/operators';
import { async } from 'q';

@Component({
  selector: 'app-edit_product',
  templateUrl: './edit_product.component.html',
  styleUrls: ['./edit_product.component.css']
})
export class Edit_productComponent implements OnInit {
  formEditProduct: FormGroup;

  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  messager: string;
  titleStatus: string;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<Edit_userComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { 
    this.formEditProduct = this.fb.group({
      product_name : ['', [Validators.required]],
      amount : ['', [Validators.required]]
    })
    console.log(data)
  }
  updateProduct(data: Product): void{
    console.log(data)
    this.store.dispatch(new UpdateProductAction(data));
    this.loading$ = this.store.select(store => store.product.loading);
    this.loading$.subscribe(data => this.loading = data);
    this.error$ =  this.store.select(store => store.product.error);
    setTimeout(()=>{
      this.error$.subscribe( err => {
        if(err){
          this.messager = err.message;
        } else {
          this.messager = 'Cập nhập thành công!'
          this.dialogRef.close();
        }
        this.openSnackBar(this.messager);
      });
    }, 1)
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  ngOnInit() {
    console.log(this.data)
  }

}
