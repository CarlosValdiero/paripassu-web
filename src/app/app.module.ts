import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpApi } from './services/http-api';
import { PasswordService } from './services/password.service';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentPasswordComponent } from './components/current-password/current-password.component';
import { NewPasswordComponent } from './pages/home/new-password/new-password.component';
import { MyPasswordComponent } from './pages/home/my-password/my-password.component';
import { PasswordControlComponent } from './pages/admin/password-control/password-control.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    CurrentPasswordComponent,
    NewPasswordComponent,
    MyPasswordComponent,
    PasswordControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpApi,
    PasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
