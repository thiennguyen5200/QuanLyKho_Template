import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductComponent } from './product.component';
import { List_productComponent } from './list_product/list_product.component';
import { Edit_productComponent } from './edit_product/edit_product.component';
import { Create_productComponent } from './create_product/create_product.component';

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
    ProductComponent,
    List_productComponent,
    Edit_productComponent,
    Create_productComponent
  ],
  entryComponents:[List_productComponent, Edit_productComponent, Create_productComponent]
})
export class ProductModule { }
