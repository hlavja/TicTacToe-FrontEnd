import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Message} from "../../../model/message.model";
import {FriendResourceService} from "../../../swagger-generated";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  @Input() message: Message;

  constructor(
    public activeModal: NgbActiveModal,
    private friendService: FriendResourceService
  ) {}

  ngOnInit(): void {
  }

  accept(){
    this.friendService.addFriendUsingPOST(this.message.senderLogin, "body").toPromise()
      .then((success) => {
        if (success){
          this.activeModal.close(this.message.senderLogin);
        } else {
          console.log("error")
        }
      });
  }
}
