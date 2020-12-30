import {GameDTO} from "../../shared/swagger-generated";

export interface GameInfo {
  game?: GameDTO;
  playerPiece?: string;
  opponentPiece?: string;
  playerOnTurnLogin?: string;
  board?: string[][];
}
