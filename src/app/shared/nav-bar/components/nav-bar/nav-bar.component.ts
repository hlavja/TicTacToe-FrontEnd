import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../../../auth/models/user.model";
import {UserState} from "../../../../auth/states/user.state";
import {AuthService} from "../../../../auth/services/auth.service";
import {User, UserDTO} from "../../../swagger-generated";
import {Subscription} from "rxjs";
import {log} from "util";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input() menuItemKey: number;
  loggedUser: UserDTO;
  subscription: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private userState: UserState,
  ) {
  }

  ngOnInit(): void {
    this.setUser();
  }

  setUser(){
    this.authService.getUserState().subscribe(res => {
      if(res){
        this.loggedUser = res
      }
    });
  }

  logOut(){
    this.authService.doLogout();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

}
