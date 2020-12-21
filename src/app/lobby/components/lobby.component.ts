import {Component, OnInit, ViewChild} from '@angular/core';
import {LobbyService} from "../services/lobby.service";
import {OnlineUser} from "../model/online-users.model";
import {Subscription} from "rxjs";
import {PlayersState} from "../states/players.state";
import {LobbyResourceService, PlayerDTO, UserDTO} from "../../shared/swagger-generated";
import {tap} from "rxjs/operators";
import Timeout = NodeJS.Timeout;
import {ContextMenuComponent} from "ngx-contextmenu";
import {AuthService} from "../../auth/services/auth.service";
import {LoggerService} from "../../shared/services/logger.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  contextMenuType;

  private subscription: Subscription[] = [];
  activities: OnlineUser[] = [];
  players: PlayerDTO[] = [];
  private interval: Timeout;
  user: UserDTO;

  constructor(
    private lobbyService: LobbyService,
    private playersState: PlayersState,
    private lobbyPlayerService: LobbyResourceService,
    private authService: AuthService,
    private logService: LoggerService
  ) {
    this.subscription[0]=this.playersState.getPlayers().subscribe(res => {
      this.players = res;
    });
    this.lobbyService.connect();

  }

  getPlayers(): void{
    this.lobbyPlayerService.getOnlineUsersUsingGET(this.user.id, "body").pipe(
      tap(data => this.playersState.setPlayers(data))
    ).subscribe();
  }

  setUser(){
    this.authService.getUserState().subscribe(res => {
      if(res){
        this.logService.consoleLog(res);
        this.user = res;
        this.getPlayers();
      }
    });
  }

  ngOnInit(): void {
    this.setUser();
    this.lobbyService.subscribe();


    this.interval = setInterval(() => {
      this.getPlayers();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
    clearInterval(this.interval);
  }

  onrightClick(event, action) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
    this.contextMenuType = action;
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  removeFriend(){

  }

  addFriend(){

  }

  askGame(){

  }



  showActivity(activity: OnlineUser): void {
    let existingActivity = false;

    for (let index = 0; index < this.activities.length; index++) {
      if (this.activities[index].sessionId === activity.sessionId) {
        existingActivity = true;
        if (activity.page === 'logout') {
          this.activities.splice(index, 1);
        } else {
          this.activities[index] = activity;
        }
      }
    }

    if (!existingActivity && activity.page !== 'logout') {
      this.activities.push(activity);
    }
  }
}
