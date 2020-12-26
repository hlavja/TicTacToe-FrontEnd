import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameResourceService, MessageDTO} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-game-challenge',
  templateUrl: './game-challenge.component.html',
  styleUrls: ['./game-challenge.component.scss']
})
export class GameChallengeComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitAcceptUserLogin: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private gameService: GameResourceService
  ) { }

  ngOnInit(): void {
  }

  accept(){
    this.gameService.acceptGameUsingGET(this.message.senderLogin, "body").toPromise()
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
    /*this.gameService.(this.message.senderLogin, "body").toPromise()
      .then((success) => {
        if (success){
          //this.activeModal.close(this.message.senderLogin);
          this.showPopupChange.emit(false);
          this.emitAcceptUserLogin.emit(this.message.senderLogin);
        } else {
          console.log("error")
        }
      });*/

    this.showPopupChange.emit(false);
    console.log(this.message.senderLogin)
  }

}
