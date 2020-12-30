import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FriendResourceService, PlayerDTO} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-remove-friend',
  templateUrl: './remove-friend.component.html',
  styleUrls: ['./remove-friend.component.scss']
})
export class RemoveFriendComponent implements OnInit {

  @Input() showPopup
  @Input() friendToRemove: PlayerDTO
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitRemoveUser: EventEmitter<string> = new EventEmitter<string>()
  constructor(
    private friendService: FriendResourceService
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.friendService.removeFriendUsingDELETE(this.friendToRemove.playerId, "response").toPromise()
      .then((success) => {
        if (success){
          this.showPopupChange.emit(false);
          this.emitRemoveUser.emit(this.friendToRemove.login);
        } else {
          console.log("error")
        }
      });
  }

  cancel() {
    this.showPopupChange.emit(false);
  }
}
