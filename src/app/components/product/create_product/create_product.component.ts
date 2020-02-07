import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/ngrx-store/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AddProductAction } from 'src/app/ngrx-store/actions/product.action';

@Component({
  selector: 'app-create_product',
  templateUrl: './create_product.component.html',
  styleUrls: ['./create_product.component.css']
})
export class Create_productComponent {
  formCreateProduct: FormGroup;
  
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  messager: string;
  product$: Observable<Array<Product>>
  product: Array<Product>;
  _isCheckProductName: Boolean;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<Create_productComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { 
    this.formCreateProduct = this.fb.group({
      name : ['', [Validators.required]],
      amount : ['', [Validators.required]],
    })
    this.product$ = store.select(state => state.product.list)
    this.product$.subscribe(data => this.product = data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkProductName(){
    const index:Product = this.product.find(x => x.product_name === this.data.product_name)
    if(index){
      this.formCreateProduct.controls['name'].setErrors({'incorrect': true})
      this._isCheckProductName = true;
    } else {
      this._isCheckProductName = false;
    }
  }
  createProduct(data: Product){
    this.store.dispatch(new AddProductAction(data));
    this.loading$ = this.store.select(store => store.product.loading);
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.product.error);
    setTimeout(()=>{
      this.error$.subscribe(err => {
        console.log(err);
        if(err){
          this.messager = err.message;
        } else {
          this.messager = 'Thêm sản phẩm thành công!'
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
