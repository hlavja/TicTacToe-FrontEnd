import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Message} from "../../../model/message.model";
import {FriendResourceService, LobbyResourceService} from "../../../swagger-generated";
import {UserState} from "../../../../auth/states/user.state";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  @Input() message: Message;

  constructor(
    public activeModal: NgbActiveModal,
    private friendService: FriendResourceService,
    private userState: UserState,
    private lobbyService: LobbyResourceService
  ) {}

  ngOnInit(): void {
  }

  accept(){
    this.friendService.addFriendUsingPOST(this.message.senderLogin, "body").toPromise()
      .then((success) => {
        if (success){
          setTimeout(() =>{
            this.lobbyService.getOnlineUsersUsingGET(this.userState.getUser().id).toPromise();
          }, 1500);
          this.activeModal.close(this.message.senderLogin);
        } else {
          console.log("error")
        }
      });
  }

  close(){

  }
}
