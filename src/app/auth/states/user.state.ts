import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { UserModel } from '../models/user.model';
import {AccountResourceService, UserDTO} from "../../shared/swagger-generated";
import {catchError, mapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserState {
  private roleState: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  private isLoggedAdmin$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userState$: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);

  constructor(
    private accountService: AccountResourceService,
  ) {
  }

  setRole(user: UserModel): void {
    this.roleState.next(user);
  }

  getRole(): UserModel {
    return this.roleState.getValue();
  }

  setUser(user: UserDTO): void {
    this.userState$.next(user);
  }

  getUser(): UserDTO {
    return this.userState$.getValue();
  }

  getUser$(): Observable<UserDTO> {
    if (this.userState$.getValue() === null){
      this.accountService.getAccountUsingGET("body")
        .subscribe(res => this.setUser(res));
    }
    console.log(this.userState$.getValue())
    return this.userState$.asObservable();
  }

  setLoggedAdmin(adminLogged: boolean): void{
    this.isLoggedAdmin$.next(adminLogged);
  }

  getLoggedAdmin(): boolean{
    return this.isLoggedAdmin$.getValue();
  }
}
