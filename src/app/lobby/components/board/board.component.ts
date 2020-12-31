import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GameResourceService, MessageDTO, MoveDTO, UserDTO} from "../../../shared/swagger-generated";
import {GameInfo} from "../../models/game-info";
import {GameState} from "../../states/game.state";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  subscription: Subscription
  @Input() showPopup
  @Input() message: MessageDTO
  gameInfo: GameInfo;
  @Input() user: UserDTO;
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor(
    private gameService: GameResourceService,
    private gameState: GameState
  ) {
    this.subscription = gameState.getGame().subscribe(res => this.gameInfo = res);
  }

  ngOnInit(): void {
  }

  clearGameInfo(){
    this.gameInfo = {};
    this.gameInfo.board = [["","","","",""], ["","", "","",""], ["", "", "","",""], ["", "", "","",""], ["", "", "","",""]];
    this.gameState.setGame(this.gameInfo);
    this.showPopupChange.emit(false);
  }

  close() {
    this.clearGameInfo();
  }

  move(row: number, col: number) {
    const move: MoveDTO = {
      boardX: col,
      boardY: row,
      gameId: this.gameInfo.game.id,
      playerId: this.user.id,
    }
    this.gameService.addMoveUsingPOST(this.gameInfo.game.id, move, "body").toPromise()
      .then((message) => {
        if (message){
          console.log(message)
          if (message.messageType == 'ADD_MOVE'){
            this.gameInfo.board[message.newMove.boardY][message.newMove.boardX] = this.gameInfo.playerPiece;
            this.gameInfo.game = message.game;
          }
          this.gameState.setGame(this.gameInfo);
        } else {
          console.log("error")
        }
      });
  }

  giveUp(){
    this.gameService.giveUpUsingPOST(this.gameInfo.game.id, "response").toPromise()
      .then((value) => {
        if (value){
          this.clearGameInfo();
        } else {
          console.log("error")
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
