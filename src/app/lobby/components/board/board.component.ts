import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameResourceService, MessageDTO, MoveDTO, UserDTO} from "../../../shared/swagger-generated";
import {GameInfo} from "../../models/game-info";
import {UserState} from "../../../auth/states/user.state";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO
  @Input() gameInfo: GameInfo = {};
  @Input() user: UserDTO;
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private gameService: GameResourceService,
  ) {
  }

  ngOnInit(): void {
  }

  move(row: number, col: number) {
    const move: MoveDTO = {
      boardX: col,
      boardY: row,
      gameId: this.gameInfo.game.id,
      playerId: this.user.id,
    }
    this.gameService.addMoveUsingPOST(this.gameInfo.game.id, move, "body").toPromise()
      .then((success) => {
        if (success){
          this.gameInfo.board[success.boardY][success.boardX] = this.gameInfo.playerPiece;
        } else {
          console.log("error")
        }
      });
    console.log(row, col)
    this.gameInfo.board[row][col] = "O";
  }

  giveUp(){
    this.gameInfo.board = [["","",""], ["","", ""], ["", "", ""]];
    this.showPopupChange.emit(false);
  }

}
