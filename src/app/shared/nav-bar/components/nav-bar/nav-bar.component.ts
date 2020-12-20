import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../auth/models/user.model";
import {UserState} from "../../../../auth/states/user.state";
import {AuthService} from "../../../../auth/services/auth.service";
import {User, UserDTO} from "../../../swagger-generated";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() menuItemKey: number;
  loggedUser: UserDTO;
  constructor(
    private authService: AuthService,
    private userState: UserState,
  ) {
    this.setUser();
  }

  ngOnInit(): void {
    this.setUser();
  }

  setUser(){
    setTimeout(() => 0);
    this.loggedUser = this.authService.getUserState();
  }

  logOut(){
    this.authService.doLogout();
  }

}
