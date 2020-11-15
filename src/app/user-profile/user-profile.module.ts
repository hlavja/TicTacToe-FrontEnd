import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";



@NgModule({
  declarations: [UserProfileComponent],
    imports: [
        CommonModule,
        NavBarModule
    ]
})
export class UserProfileModule { }
