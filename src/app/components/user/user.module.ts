import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { List_userComponent } from './list_user/list_user.component';
import { DemoMaterialModule } from 'src/app/material-module';
import { Edit_userComponent } from './edit_user/edit_user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Create_userComponent } from './create_user/create_user.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DemoMaterialModule,
    MatSnackBarModule,
    ModalModule.forRoot()
  ],
  declarations: [
    UserComponent,
    List_userComponent,
    Edit_userComponent,
    Create_userComponent
  ],
  entryComponents:[List_userComponent, Edit_userComponent, Create_userComponent]
})
export class UserModule { }
