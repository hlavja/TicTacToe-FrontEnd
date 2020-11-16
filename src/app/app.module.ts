
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import {LoginService} from "./core/login/login.service";
import {AccountService} from "./core/auth/account.service";
import {StateStorageService} from "./core/auth/state-storage.service";
import {SessionStorageService} from "ngx-webstorage";
import {LobbyModule} from "./lobby/lobby.module";
import {RegisterModule} from "./register/register.module";
import {NavBarModule} from "./shared/nav-bar/nav-bar.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    LoginModule,
    LobbyModule,
    RegisterModule,
    NavBarModule
  ],
  providers: [
    LoginService,
    AccountService,
    StateStorageService,
    SessionStorageService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
