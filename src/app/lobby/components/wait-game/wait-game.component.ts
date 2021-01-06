import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserSpecificService} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.scss']
})
export class WaitGameComponent implements OnInit {

  @Input() showPopup
  @Input() opponentLogin
  @Input() status: string
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private userSpecificService: UserSpecificService
  ) { }

  ngOnInit(): void {
  }

  cancel(login: string) {
    this.userSpecificService.cancelChallengeUsingGET(login, "response").toPromise()
      .then((success) => {
        if (success){
          //this.activeModal.close(this.message.senderLogin);
          this.showPopupChange.emit(false);
        } else {
          console.log("error")
        }
      });
  }

}
