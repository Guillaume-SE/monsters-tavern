import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MonsterModule } from './monster/monster.module';

import { TokenInterceptorProvider } from './_helpers/token.interceptor';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './_utils/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MonsterModule,
    AppRoutingModule
  ],
  providers: [
    TokenInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
