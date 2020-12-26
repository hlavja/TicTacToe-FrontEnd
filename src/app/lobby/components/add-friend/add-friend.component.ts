import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FriendResourceService, MessageDTO} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitAcceptUserLogin: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private friendService: FriendResourceService
  ) { }

  ngOnInit(): void {
  }

  accept(){
    this.friendService.addFriendUsingPOST(this.message.senderLogin, "body").toPromise()
      .then((success) => {
        if (success){
          //this.activeModal.close(this.message.senderLogin);
          this.showPopupChange.emit(false);
          this.emitAcceptUserLogin.emit(this.message.senderLogin);
        } else {
          console.log("error")
        }
      });
  }

  reject(){
    this.showPopupChange.emit(false);
  }
}
