import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/components/login.component";
import {LobbyComponent} from "./lobby/components/lobby.component";
import {RegisterComponent} from "./register/components/register.component";
import {Authority} from "./shared/constants/authority.constants";
import {UserRouteAccessService} from "./core/auth/user-route-access-service";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    canActivate: [UserRouteAccessService],
    path: 'lobby',
    component: LobbyComponent,
    pathMatch: 'full',
    data: {
      authorities: [Authority.ADMIN, Authority.USER]
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
