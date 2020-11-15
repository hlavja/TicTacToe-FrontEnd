import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/components/login.component";
import {RegisterComponent} from "./register/components/register.component";
import {LobbyComponent} from "./lobby/components/lobby.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RoleGuard} from "./auth/guards/role.guard";

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
    path: 'login',
    component: LoginComponent,
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
