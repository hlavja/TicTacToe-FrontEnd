import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {HttpClientModule} from "@angular/common/http";
import {LobbyModule} from "./lobby/lobby.module";
import {RouterModule} from "@angular/router";
import {NavBarModule} from "./shared/nav-bar/nav-bar.module";
import {UserProfileModule} from "./user-profile/user-profile.module";
import {MatchHistoryModule} from "./match-history/match-history.module";
import {ResetPasswordModule} from "./reset-password/reset-password.module";
import {CookieService} from "ngx-cookie-service";
import {GameModule} from "./game/game.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserAdministrationModule} from "./user-administration/user-administration.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    HttpClientModule,
    LobbyModule,
    RouterModule,
    NavBarModule,
    UserProfileModule,
    MatchHistoryModule,
    ResetPasswordModule,
    GameModule,
    UserAdministrationModule
  ],
  providers: [
    Title,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
