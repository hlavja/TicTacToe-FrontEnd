import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdministrationComponent } from './components/user-administration.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";



@NgModule({
  declarations: [UserAdministrationComponent],
  imports: [
    CommonModule,
    NavBarModule
  ]
})
export class UserAdministrationModule { }
