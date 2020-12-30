import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../shared/services/websocket.service";
import {Subscription} from "rxjs";
import {PlayersState} from "../states/players.state";
import {
  FriendResourceService, GameDTO, GameResourceService,
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
import {GameInfo} from "../models/game-info";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {

  friendToRemove: PlayerDTO;
  subscription: Subscription[] = [];
  players: PlayerDTO[] = [];
  interval: Timeout;
  user: UserDTO;
  showAddFriend = false;
  showWaitGame = false;
  showGameChallenge = false;
  showGameBoard = false;
  showRemoveConfirmation = false;
  message: MessageDTO = {};
  status: string;
  waitingFor: string = 'WAITING';
  actualGameInfo: GameInfo = {};

  constructor(
    private websocketService: WebsocketService,
    private playersState: PlayersState,
    private lobbyPlayerService: LobbyResourceService,
    private authService: AuthService,
    private logService: LoggerService,
    private userSpecific: UserSpecificService,
    private friendService: FriendResourceService,
    private gameService: GameResourceService,
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

  removeFriend(player: PlayerDTO){
    this.friendToRemove = player;
    this.showRemoveConfirmation = true;
  }

  addFriend(playerLogin: string){
    this.userSpecific.askFriendUsingGET(playerLogin, "body").toPromise();
  }

  completeAddFriend(login: string){
    this.players.find(item => item.login === login).friend = true;
  }

  completeRemoveUser(login: string){
    this.players.find(item => item.login === login).friend = false;
  }

  completeGameChallenge(actualGame: GameDTO, inviter: boolean){
    this.actualGameInfo.game = actualGame;
    if (inviter){
      this.actualGameInfo.playerPiece = 'X';
    } else {
      this.actualGameInfo.playerPiece = 'O';
    }

    this.actualGameInfo.board = [["","",""],["","",""],["","",""]];

    /*this.gameState.setGame(gameInfo);

    if (this.gameState.getGame()){
      this.showGameBoard = true;
    }*/

    if (actualGame.turnUserId === actualGame.firstPlayerId){
      this.actualGameInfo.playerOnTurnLogin = actualGame.firstPlayerLogin;
    } else {
      this.actualGameInfo.playerOnTurnLogin = actualGame.secondPlayerLogin;
    }

    console.log(this.actualGameInfo.playerOnTurnLogin)

    if (this.actualGameInfo.game){
      this.showGameBoard = true;
    }
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
        this.gameService.rejectGameUsingGET(message.senderLogin, "body").toPromise();
      } else {
        this.showGameChallenge = true;
      }
    }
    if (message.messageType === 'GAME_ACCEPTED'){
      this.status = "ACCEPTED";
      this.terminateWaiting();
      this.completeGameChallenge(message.game, true);
    }
    if (message.messageType === 'GAME_REJECTED'){
      this.status = "REJECTED";
      this.terminateWaiting()
    }
  }

  terminateWaiting(){
    setTimeout(() =>{
      this.showWaitGame = false;
    }, 1000);
    setTimeout(() =>{
      this.status = 'WAITING';
    }, 1100);
  }
}
