import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/Error/Error.component';
import { SignInComponent } from './components/signIn/signIn.component';
import { UserComponent } from './components/user/user.component';
import { List_userComponent } from './components/user/list_user/list_user.component';
import { ProductComponent } from './components/product/product.component';
import { List_productComponent } from './components/product/list_product/list_product.component';
import { SigninGuard } from './guard/signin.guard';


const routes: Routes = [
  {path:'', component: HomeComponent, canActivate: [ SigninGuard ]},
  {path:'404', component: ErrorComponent},
  {path:'signin', component: SignInComponent},
  // {path:'list-product', component:ProductComponent},
  {path:'user', component: UserComponent, 
  children:[
    {path:'', redirectTo: 'list-user', pathMatch: 'full'},
    {path:'list-user', component: List_userComponent}
  ]},
  {path:'product', component: ProductComponent, 
  children:[
    {path:'', redirectTo: 'list-product', pathMatch: 'full'},
    {path:'list-product', component: List_productComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
