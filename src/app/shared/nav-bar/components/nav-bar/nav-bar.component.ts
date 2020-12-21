import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/services/auth.service";
import {UserDTO} from "../../../swagger-generated";
import {Subscription} from "rxjs";

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
    private authService: AuthService
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
