import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './components/lobby.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";



@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    NavBarModule
  ]
})
export class LobbyModule { }
