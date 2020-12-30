import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './components/lobby.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import { BoardComponent } from './components/board/board.component';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { WaitGameComponent } from './components/wait-game/wait-game.component';
import { GameChallengeComponent } from './components/game-challenge/game-challenge.component';
import { RemoveFriendComponent } from './components/remove-friend/remove-friend.component';


@NgModule({
  declarations: [LobbyComponent, BoardComponent, AddFriendComponent, WaitGameComponent, GameChallengeComponent, RemoveFriendComponent],
  imports: [
    CommonModule,
    NavBarModule,
    DialogModule,
    ButtonModule
  ]
})
export class LobbyModule { }
