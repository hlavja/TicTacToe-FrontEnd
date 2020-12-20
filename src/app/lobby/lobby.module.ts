import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './components/lobby.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import {ContextMenuModule} from "ngx-contextmenu";


@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    NavBarModule,
    ContextMenuModule,

  ]
})
export class LobbyModule { }
