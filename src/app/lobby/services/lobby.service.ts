import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import {OnlineUser} from "../model/online-users.model";


@Injectable({ providedIn: 'root' })
export class LobbyService {
  private stompClient: Stomp.Client | null = null;
  private routerSubscription: Subscription | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<OnlineUser> = new Subject();
  private readonly JWT_TOKEN = 'authenticationtoken';
  private sessionId: string = '';

  constructor(
    private router: Router,
    private location: Location) {}

  connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    //let url = '/ws/websocket/tracker';
    let url = '/ws/websocket/lobby';
    url = this.location.prepareExternalUrl(url);
    const authToken = sessionStorage.getItem(this.JWT_TOKEN);
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(headers, () => {
      let urlarray = socket._transport.url.split('/');
      var index = urlarray.length - 2;
      this.sessionId = urlarray[index];
      console.log(this.sessionId);
      this.connectionSubject.next();

      //this.sendActivity();
      this.sendActivity2();

      /*this.routerSubscription = this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe(() => this.sendActivity2());*/
    });
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  receive(): Subject<OnlineUser> {
    return this.listenerSubject;
  }

  subscribe(): void {
    if (this.connectionSubscription) {
      return;
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        //this.stompSubscription = this.stompClient.subscribe('/topic/tracker', (data: Stomp.Message) => {
        this.stompSubscription = this.stompClient.subscribe('/secured/user/queue/specific-user-user' + this.sessionId, (data: Stomp.Message) => {
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }

  private sendActivity(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/topic/activity', // destination
        JSON.stringify({ page: this.router.routerState.snapshot.url }), // body
        {} // header
      );
    }
  }

  sendActivity2(): void {
    console.log("aa")
    if (this.stompClient && this.stompClient.connected) {
      console.log("bb")
      this.stompClient.send(
        '/secured/player-action', // destination
        JSON.stringify({ senderLogin: "user", messageType: "CREATE_GAME", opponentLogin: "user" }), // body
        {} // header
      );
    }
  }
}
