import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameDTO, GameResourceService, MessageDTO} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-game-challenge',
  templateUrl: './game-challenge.component.html',
  styleUrls: ['./game-challenge.component.scss']
})
export class GameChallengeComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitNewGame: EventEmitter<GameDTO> = new EventEmitter<GameDTO>()

  constructor(
    private gameService: GameResourceService
  ) { }

  ngOnInit(): void {
  }

  accept(){
    this.gameService.acceptGameUsingGET(this.message.senderLogin, "body").toPromise()
      .then((success) => {
        if (success){
          this.showPopupChange.emit(false);
          this.emitNewGame.emit(success);
        } else {
          console.log("error")
        }
      });
  }

  reject(){
    this.gameService.rejectGameUsingGET(this.message.senderLogin, "body").toPromise()
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
