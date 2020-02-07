import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from 'src/app/ngrx-store/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Edit_userComponent } from '../edit_user/edit_user.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-store/models/app-state.model';
import { LoadUserAction, DeleteUserAction } from 'src/app/ngrx-store/actions/user.action';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Create_userComponent } from '../create_user/create_user.component';

@Component({
  selector: 'app-list_user',
  templateUrl: './list_user.component.html',
  styleUrls: ['./list_user.component.css']
})
export class List_userComponent implements OnInit {
  _isCheckEditUser = false;
  _isCheckUser: Boolean;

  loading$: Observable<Boolean>;
  loading: Boolean;
  error$: Observable<Error>;
  UserItems: Observable<Array<User>>
  message: string;
  _token: User;
  modalRef: BsModalRef;
  idDelete: string
  
  displayedColumns: string[] = ['account','name', 'email', 'phone', 'create_date', 'status','edit','delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private snackBar: MatSnackBar
  ) {
    this.store.dispatch(new LoadUserAction());
    const token = localStorage.getItem('_account');
    this._token = this.userService.verifyAccount(token)
  }

  ngOnInit() {
    this.UserItems = this.store.select(store => store.user.list);
    this.UserItems.subscribe(data => {
      if(data) {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    this.loading$ = this.store.select(store => store.user.loading)
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(store => store.user.error);

    
  }
  openModal(template: TemplateRef<any>, id: string) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
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

  openDialogEditUser(id: string, name: string, email: string, phone: string, status: boolean){
    this._isCheckEditUser = true;
    let width = '33%';
    if (window.screen.width < 760) {
      width = '60%'
    }
    const dialogRef = this.dialog.open(Edit_userComponent, {
      hasBackdrop: false,
      width: width,
      minHeight: '300px',
      data: {id: id, name: name, email: email ,phone: phone, status: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 
  }
  openDialogCreateUser(){
    this._isCheckEditUser = true;
    const dialogRef = this.dialog.open(Create_userComponent, {
      hasBackdrop: false,
      width: '50%',
      minHeight: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      // this.dataSource = new MatTableDataSource(result);
    }); 
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
    console.log('submitDelete')
    console.log(id)
    this.store.dispatch(new DeleteUserAction(id))
    this.loading$ = this.store.select(state => state.user.loading)
    this.loading$.subscribe(data => this.loading = data);
    this.error$ = this.store.select(state => state.user.error)
    setTimeout(()=>{
      this.error$.subscribe(err => {
        if (err) {
          this.message = err.message
        } else {
          this.message = 'Xoa thanh cong!'
        }
      })
      this.openSnackBar(this.message)
      this.modalRef.hide();
    },1)
  }

  decline(): void {
    this.modalRef.hide();
  }

}
