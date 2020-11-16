import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/components/login.component";
import {RegisterComponent} from "./register/components/register.component";
import {LobbyComponent} from "./lobby/components/lobby.component";
import {UserProfileComponent} from "./user-profile/components/user-profile/user-profile.component";
import {MatchHistoryComponent} from "./match-history/components/match-history/match-history.component";
import {ResetPasswordComponent} from "./reset-password/components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'lobby',
    component: LobbyComponent,
    pathMatch: 'full',
  }, {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    pathMatch: 'full',
  }, {
    path: 'match-history/user/:id',
    component: MatchHistoryComponent,
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }, {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch: 'full',
  }, {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  { path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
