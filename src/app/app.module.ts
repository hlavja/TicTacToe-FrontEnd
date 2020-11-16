
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {LobbyModule} from "./lobby/lobby.module";
import {NavBarModule} from "./shared/nav-bar/nav-bar.module";
import {UserProfileModule} from "./user-profile/user-profile.module";
import {MatchHistoryModule} from "./match-history/match-history.module";
import {ResetPasswordModule} from "./reset-password/reset-password.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AccountResourceService} from "./shared/swagger-generated";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    HttpClientModule,
    LobbyModule,
    RouterModule,
    NavBarModule,
    UserProfileModule,
    MatchHistoryModule,
    ResetPasswordModule
  ],
  providers: [
    AccountResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
