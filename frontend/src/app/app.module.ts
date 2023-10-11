import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material-module';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from "ngx-ui-loader";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component'
import { TokenInterceptorInterceptor } from './service/token-interceptor.interceptor';

const ngxUiLoaderConfig : NgxUiLoaderConfig={
  text : "Loading...",
  textColor : "#FFFFFF",
  textPosition:"center-center",
  pbColor : "red",
  bgsColor:"red",
  fgsColor:"red",
  fgsType:SPINNER.ballSpinClockwise,
  fgsSize :100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}
@NgModule({
  declarations: [
    AppComponent,
    BestSellerComponent,
    HomeComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgetPasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)    
  ],
  providers: [
    HttpClientModule,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
