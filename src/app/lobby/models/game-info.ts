import {GameDTO} from "../../shared/swagger-generated";

export interface GameInfo {
  game?: GameDTO;
  playerPiece?: string;
  playerOnTurnLogin?: string;
}
