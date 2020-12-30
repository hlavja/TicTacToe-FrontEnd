import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameDTO, PlayerDTO} from "../../shared/swagger-generated";
import {GameInfo} from "../models/game-info";

@Injectable({
  providedIn: 'root'
})
export class GameState {
  private gameState$:BehaviorSubject<GameInfo> = new BehaviorSubject<GameInfo>(null);

  setGame(game: GameInfo): void {
    this.gameState$.next(game);
  }

  getGame(): Observable<GameInfo> {
    return this.gameState$.asObservable();
  }
}
