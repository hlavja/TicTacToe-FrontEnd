import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopOutsComponent } from './components/pop-outs.component';
import {AddFriendComponent} from "./components/add-friend/add-friend.component";
import { GameChallengeComponent } from './components/game-challenge/game-challenge.component';
import { WaitWindowComponent } from './components/wait-window/wait-window.component';



@NgModule({
  declarations: [PopOutsComponent, AddFriendComponent, GameChallengeComponent, WaitWindowComponent],
  imports: [
    CommonModule
  ]
})
export class PopOutsModule { }
