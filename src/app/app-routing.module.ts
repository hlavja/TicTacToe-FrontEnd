import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/components/login.component";
import {RegisterComponent} from "./register/components/register.component";
import {LobbyComponent} from "./lobby/components/lobby.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RoleGuard} from "./auth/guards/role.guard";
import {UserProfileComponent} from "./user-profile/components/user-profile/user-profile.component";
import {MatchHistoryComponent} from "./match-history/components/match-history/match-history.component";
import {ResetPasswordComponent} from "./reset-password/components/reset-password/reset-password.component";

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    canActivate: [AuthGuard, RoleGuard],
    path: 'lobby',
    component: LobbyComponent,
    pathMatch: 'full',
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    canActivate: [AuthGuard, RoleGuard],
    path: 'user-profile/:id',
    component: UserProfileComponent,
    pathMatch: 'full',
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    canActivate: [AuthGuard, RoleGuard],
    path: 'match-history/user/:id',
    component: MatchHistoryComponent,
    pathMatch: 'full',
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_USER']
    }
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
