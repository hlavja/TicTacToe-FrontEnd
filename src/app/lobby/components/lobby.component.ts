import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../shared/services/websocket.service";
import {Subscription} from "rxjs";
import {PlayersState} from "../states/players.state";
import {
  FriendResourceService,
  LobbyResourceService,
  PlayerDTO,
  UserDTO,
  UserSpecificService
} from "../../shared/swagger-generated";
import {tap} from "rxjs/operators";
import Timeout = NodeJS.Timeout;
import {AuthService} from "../../auth/services/auth.service";
import {LoggerService} from "../../shared/services/logger.service";
import {Message} from "../../shared/model/message.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddFriendComponent} from "../../shared/pop-outs/components/add-friend/add-friend.component";
import {GameChallengeComponent} from "../../shared/pop-outs/components/game-challenge/game-challenge.component";
import {WaitWindowComponent} from "../../shared/pop-outs/components/wait-window/wait-window.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {

  subscription: Subscription[] = [];
  players: PlayerDTO[] = [];
  interval: Timeout;
  user: UserDTO;
  waitWindow;
  friendRequestWindow;
  gameChallengeWindow;

  constructor(
    private websocketService: WebsocketService,
    private playersState: PlayersState,
    private lobbyPlayerService: LobbyResourceService,
    private authService: AuthService,
    private logService: LoggerService,
    private userSpecific: UserSpecificService,
    private modalService: NgbModal,
    private friendService: FriendResourceService
  ) {
    this.subscription[0]=this.playersState.getPlayers().subscribe(res => {
      this.players = res;
    });
    this.websocketService.connect();

  }

  getPlayers(): void{
    this.lobbyPlayerService.getOnlineUsersUsingGET(this.user.id, "body").pipe(
      tap(data => this.playersState.setPlayers(data))
    ).subscribe();
  }

  setUser(){
    this.authService.getUserState().subscribe(res => {
      if(res){
        this.user = res;
        this.getPlayers();
      }
    });
  }

  ngOnInit(): void {
    this.setUser();
    this.websocketService.subscribe();


    this.interval = setInterval(() => {
      this.getPlayers();
    }, 5000);

    this.subscription[1] = this.websocketService.receive().subscribe((message: Message) => {
      this.logService.consoleLog(message)
      this.handleMessage(message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
    clearInterval(this.interval);
  }

  removeFriend(playerId: number){
    this.friendService.removeFriendUsingDELETE(playerId, "response").toPromise();
    this.players.find(item => item.playerId === playerId).friend = false;
  }

  addFriend(playerLogin: string){
    this.userSpecific.askFriendUsingGET(playerLogin, "body").toPromise();
  }

  askGame(){
    this.waitWindow.open(WaitWindowComponent);
  }

  handleMessage(message: Message){
    if (message.messageType === 'ADD_FRIEND'){
      this.friendRequestWindow = this.modalService.open(AddFriendComponent);
      this.friendRequestWindow.componentInstance.message = message;
      //the navazuji na promisu
      this.friendRequestWindow.result.then(
        result => this.players.find(item => item.login === result).friend = true
      );
    }
    if (message.messageType === 'GAME_CHALLENGE'){
      this.gameChallengeWindow = this.modalService.open(GameChallengeComponent)
      this.gameChallengeWindow.componentInstance.message = message;
    }
    if (message.messageType === 'GAME_ACCEPTED'){
      this.waitWindow.componentInstance.accepted = true;
      if (this.waitWindow){
        setTimeout(() =>{
          this.waitWindow.close();
        }, 1500);
      }
    }
  }
}
