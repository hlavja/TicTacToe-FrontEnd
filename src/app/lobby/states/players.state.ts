import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlayerDTO} from "../../shared/swagger-generated";

@Injectable({
  providedIn: 'root'
})
export class PlayersState {
  private playersState$:BehaviorSubject<PlayerDTO[]> = new BehaviorSubject<PlayerDTO[]>([]);

  setPlayers(players: PlayerDTO[]): void {
    this.playersState$.next(players);
  }

  getPlayers(): Observable<PlayerDTO[]> {
    return this.playersState$.asObservable();
  }
}
