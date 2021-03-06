import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {PasswordModule} from "primeng/password";



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NavBarModule,
    PasswordModule,
  ]
})
export class UserProfileModule { }
