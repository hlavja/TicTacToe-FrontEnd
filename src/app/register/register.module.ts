import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {PasswordModule} from "primeng/password";



@NgModule({
  declarations: [RegisterComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        PasswordModule
    ]
})
export class RegisterModule { }
