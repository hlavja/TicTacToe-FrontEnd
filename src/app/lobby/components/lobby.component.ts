import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../shared/services/websocket.service";
import {Subscription} from "rxjs";
import {PlayersState} from "../states/players.state";
import {
  FriendResourceService, GameResourceService,
  LobbyResourceService,
  MessageDTO,
  PlayerDTO,
  UserDTO,
  UserSpecificService
} from "../../shared/swagger-generated";
import {tap} from "rxjs/operators";
import Timeout = NodeJS.Timeout;
import {AuthService} from "../../auth/services/auth.service";
import {LoggerService} from "../../shared/services/logger.service";

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
  showAddFriend = false;
  showWaitGame = false;
  showGameChallenge = false;
  showGameBoard = false;
  message: MessageDTO = {};
  status: string;
  waitingFor: string = 'WAITING';

  constructor(
    private websocketService: WebsocketService,
    private playersState: PlayersState,
    private lobbyPlayerService: LobbyResourceService,
    private authService: AuthService,
    private logService: LoggerService,
    private userSpecific: UserSpecificService,
    private friendService: FriendResourceService,
    private gameService: GameResourceService
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

    this.subscription[1] = this.websocketService.receive().subscribe((message: MessageDTO) => {
      this.message = message;
      this.handleMessage(message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
    clearInterval(this.interval);
  }

  removeFriend(playerId: number){
    //TODO CONFIRMATION!!
    this.friendService.removeFriendUsingDELETE(playerId, "response").toPromise();
    this.players.find(item => item.playerId === playerId).friend = false;
  }

  addFriend(playerLogin: string){
    this.userSpecific.askFriendUsingGET(playerLogin, "body").toPromise();
  }

  completeAddFriend(login: string){
    this.players.find(item => item.login === login).friend = true;
  }

  completeGameChallenge(login: string){
    console.log("start game!")
    this.showGameBoard = true;
  }

  askGame(playerLogin: string){
    this.gameService.challengeGameUsingGET(playerLogin, "body").toPromise();
    this.showWaitGame = true;
    this.status = 'WAITING';
    this.waitingFor = playerLogin;
  }

  handleMessage(message: MessageDTO){
    if (message.messageType === 'ADD_FRIEND'){
      this.showAddFriend = true;
    }
    if (message.messageType === 'GAME_CHALLENGE'){
      if (this.showGameChallenge || this.showWaitGame){
        //TODO reject invitational
      } else {
        this.showGameChallenge = true;
      }
    }
    if (message.messageType === 'GAME_ACCEPTED'){
      this.status = "ACCEPTED";
      this.terminateWaiting();
    }
    if (message.messageType === 'GAME_REJECTED'){
      this.status = "REJECTED";
      this.terminateWaiting()
    }
  }

  terminateWaiting(){
    setTimeout(() =>{
      this.showWaitGame = false;
      this.status = 'WAITING';
    }, 1000);
  }
}
