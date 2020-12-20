import { Component, OnInit } from '@angular/core';
import {LobbyService} from "../services/lobby.service";
import {OnlineUser} from "../model/online-users.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  activities: OnlineUser[] = [];
  subscription?: Subscription;

  constructor(
    private lobbyService: LobbyService
  ) {
    this.lobbyService.connect();
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

  connectWebsocket(){
    this.lobbyService.connect();
  }
  disconnectWebsocket(){
    this.lobbyService.disconnect();
  }
  subscribeWebsocket(){
    this.lobbyService.subscribe();
  }

  askForGame(){
    this.lobbyService.sendActivity2();
  }

  ngOnInit(): void {
    this.lobbyService.subscribe();
    this.subscription = this.lobbyService.receive().subscribe((activity: OnlineUser) => {
      this.showActivity(activity);
    });
  }

  ngOnDestroy(): void {
  }

}
