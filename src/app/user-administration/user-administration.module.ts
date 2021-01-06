import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdministrationComponent } from './components/user-administration.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";



@NgModule({
  declarations: [UserAdministrationComponent],
  imports: [
    CommonModule,
    NavBarModule,
    ReactiveFormsModule,
    PasswordModule
  ]
})
export class UserAdministrationModule { }
