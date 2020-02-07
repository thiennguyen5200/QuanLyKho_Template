import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule } from 'ngx-bootstrap';
import { AccountReducer, UserReducer } from './ngrx-store/reducers/user.reducer';
import { ProductReducer } from './ngrx-store/reducers/product.reducer';
import { ProductEffect } from './ngrx-store/effects/product.effect';
import { AccountEffect } from './ngrx-store/effects/account.effect';
import { UserEffect } from './ngrx-store/effects/user.effect';
import { UserModule } from './components/user/user.module';
import { ProductModule } from './components/product/product.module';
import { StoreModule } from '@ngrx/store';
import { SignInComponent } from './components/signIn/signIn.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/Error/Error.component';
import { JWTService } from './services/JWTService';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      DemoMaterialModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      UserModule,
      ProductModule,
      StoreModule.forRoot({
         user: UserReducer,
         account: AccountReducer,
         product: ProductReducer
      }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([UserEffect, AccountEffect, ProductEffect]),
      ModalModule.forRoot()
  ],
  providers: [
    JWTService,
    UserService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
