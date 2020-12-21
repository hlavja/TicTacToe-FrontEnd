import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendComponent } from './components/add-friend.component';



@NgModule({
  declarations: [AddFriendComponent],
  exports: [
    AddFriendComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AddFriendModule { }
