import { Component, OnInit } from '@angular/core';
import {GameDTO, GameResourceService} from "../../shared/swagger-generated";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {

  games: GameDTO[] = null;
  constructor(
    private gameService: GameResourceService
  ) { }

  ngOnInit(): void {
    this.getGameResults();
  }

  refreshData(){
    this.getGameResults();
  }

  getGameResults(){
    this.gameService.getAllGamesUsingGET("body").pipe(
      tap(data => this.games = data)
    ).toPromise();
  }
}
