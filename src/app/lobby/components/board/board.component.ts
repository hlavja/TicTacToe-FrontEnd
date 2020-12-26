import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageDTO} from "../../../shared/swagger-generated";
import {GameInfo} from "../../models/game-info";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO
  boardSize = 3;
  @Input() board: string[][]
  @Input() gameInfo: GameInfo = {};
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {
    this.gameInfo.playerPiece = 'X';
  }

  ngOnInit(): void {
  }

  move(row: number, col: number){
    console.log(row, col)
    this.board[row][col] = "O";
  }

  giveUp(){
    this.board = [["","",""], ["","", ""], ["", "", ""]];
    this.showPopupChange.emit(false);
  }

}
