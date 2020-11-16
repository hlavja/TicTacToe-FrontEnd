
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
import {SessionStorageService} from "ngx-webstorage";
import {LobbyModule} from "./lobby/lobby.module";
import {RegisterModule} from "./register/register.module";
import {NavBarModule} from "./shared/nav-bar/nav-bar.module";
import {TicTacSharedModule} from "./shared/shared.module";
import {AccountResourceService} from "./shared/swagger-generated";

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
    NavBarModule,
    TicTacSharedModule
  ],
  providers: [
    LoginService,
    AccountService,
    SessionStorageService,
    AccountResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
