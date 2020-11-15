import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../auth/models/user.model";
import {UserState} from "../../../../auth/states/user.state";
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() menuItemKey: number;
  loggedUser: UserModel;
  constructor(
    private authService: AuthService,
    private userState: UserState,
  ) {
    this.loggedUser = userState.get();
  }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.doLogout();
  }

}
