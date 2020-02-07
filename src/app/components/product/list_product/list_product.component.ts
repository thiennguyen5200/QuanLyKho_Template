import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/ngrx-store/models/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { LoadProductAction, DeleteProductAction, UpdateAmountAction } from 'src/app/ngrx-store/actions/product.action';
import { User } from 'src/app/ngrx-store/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Edit_productComponent } from '../edit_product/edit_product.component';
import { Create_productComponent } from '../create_product/create_product.component';
// import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list_product',
  templateUrl: './list_product.component.html',
  styleUrls: ['./list_product.component.css']
})
export class List_productComponent implements OnInit {
  _isCheckEditProduct = false;
  _isCheckUser: Boolean;
  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  ProductItems$: Observable<Array<Product>>
  message: string;
  modalRef: BsModalRef;
  idDelete: string;
  messager: string;
  valueImport: number;
  valueExport: number;
  displayedColumns: string[] = ['product_name', 'amount','xuat', 'nhap' ,'edit','delete'];
  dataSource: MatTableDataSource<Product>;
  // selection = new SelectionModel<Product>(true, []);
  _token: User;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private store: Store<AppState>,
    private modalService: BsModalService,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { 
    this.store.dispatch(new LoadProductAction());
    const token = localStorage.getItem('_account');
    this._token = this.userService.verifyAccount(token)

    this.ProductItems$ = this.store.select(store => store.product.list);
    this.ProductItems$.subscribe(data => {
      if(data) {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data.forEach(x =>{
          x.checkedImport = true;
          x.checkedExport = true;
        })
      }
    });
    this.loading$ = this.store.select(store => store.product.loading)
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.product.error);
  }

  ngOnInit() {
    
  }
  export(id: string){
    const index: Product = this.dataSource.data.find(x => x._id === id);
    const i = this.dataSource.data.indexOf(index);
    this.dataSource.data[i].checkedExport = false;
    this.dataSource.data[i].checkedImport = true;
  }

  submitExport(id: string){
    const index: Product = this.dataSource.data.find(x => x._id === id);
    const i = this.dataSource.data.indexOf(index);
    this.dataSource.data[i].checkedExport = true;
    if(index.amount < this.valueExport){
      this.openSnackBar('Cảnh báo! Số lượng cần xuất kho không đủ.')
    } else if (this.valueExport === null || this.valueExport === 0 || !this.valueExport || this.valueExport < 0){
      if (this.valueExport < 0) {
        this.openSnackBar('Số lượng nhập không hợp lệ');
      }
    } else {
      const data: Product = {
        _id: index._id,
        product_name: index.product_name,
        amount: (index.amount - this.valueExport)
      }
      console.log(data)
      this.store.dispatch(new UpdateAmountAction(data))
      this.loading$ = this.store.select(store => store.product.loading);
      this.loading$.subscribe(data => this.loading = data);
      this.error$ =  this.store.select(store => store.product.error);
      setTimeout(()=>{
        this.error$.subscribe( err => {
          if(err){
            this.messager = err.message;
          } else {
            this.messager = 'Xuất kho thành công!';
          }
          this.openSnackBar(this.messager);
        });
      }, 1)
      this.valueExport = null;
    }
  }

  import(id: string){
    const index: Product = this.dataSource.data.find(x => x._id === id);
    const i = this.dataSource.data.indexOf(index);
    this.dataSource.data[i].checkedImport = false;
    this.dataSource.data[i].checkedExport = true;
  }
  submitImport(id: string){
    const index: Product = this.dataSource.data.find(x => x._id === id);
    const i = this.dataSource.data.indexOf(index);
    this.dataSource.data[i].checkedImport = true;
    console.log(this.valueImport)
    if(this.valueImport !== null || this.valueImport !== 0 || this.valueImport !== undefined || this.valueImport !== NaN){
      const data: Product = {
        _id: index._id,
        product_name: index.product_name,
        amount: (index.amount + this.valueImport)
      }
      console.log(data)
      this.store.dispatch(new UpdateAmountAction(data))
      this.loading$ = this.store.select(store => store.product.loading);
      this.loading$.subscribe(data => this.loading = data);
      this.error$ =  this.store.select(store => store.product.error);
      setTimeout(()=>{
        this.error$.subscribe( err => {
          if(err){
            this.messager = err.message;
          } else {
            this.messager = 'Nhập kho thành công!'
          }
          this.openSnackBar(this.messager);
        });
      }, 1)
      this.valueImport = null;
    }
  }
 
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Product): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  // }

  openModal(template: TemplateRef<any>, id: string) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  // openDialogEditProductArray(){
  //   const product: Array<Product> = this.selection.selected
  //   this._isCheckEditProduct = true;
  //   let width = '33%';
  //   if (window.screen.width < 760) {
  //     width = '60%'
  //   }
  //   const dialogRef = this.dialog.open(Edit_productComponent, {
  //     hasBackdrop: false,
  //     width: width,
  //     minHeight: '300px',
  //     data: product
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   }); 
  // }
  openDialogEditProduct(id:string,name:string,amount:number){
    this._isCheckEditProduct = true;
    let width = '25%';
    if (window.screen.width < 760) {
      width = '60%'
    }
    const dialogRef = this.dialog.open(Edit_productComponent, {
      hasBackdrop: false,
      width: width,
      minHeight: '200px',
      data: {_id: id, product_name: name, amount: amount}
    });

    dialogRef.afterClosed().subscribe(result => {
    }); 
  }

  openDialogCreateProduct(){
    this._isCheckEditProduct = true;
    let width = '25%';
    if (window.screen.width < 760) {
      width = '60%'
    }
    const dialogRef = this.dialog.open(Create_productComponent, {
      hasBackdrop: false,
      width: width,
      minHeight: '200px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    }); 
  }

  decline(): void {
    this.modalRef.hide();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  submitDelete(){
    const id = this.idDelete;
    this.store.dispatch(new DeleteProductAction(id))
    this.loading$ = this.store.select(state => state.product.loading)
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(state => state.product.error)
    setTimeout(()=>{
      this.error$.subscribe(err => {
        if (err) {
          this.message = err.message
        } else {
          this.message = 'Xóa thành công!'
        }
        this.openSnackBar(this.message)
  
      })
      this.modalRef.hide();
    },1)
  }
  
  checkEventEdit(value: User){
    let bool : boolean
    if(this._token.level === 1){
      bool = true;
    } else {
      if(value._id === this._token._id){
        bool = true;
      } else {
        bool = false;
      }
    }
    return bool;
  }
}
