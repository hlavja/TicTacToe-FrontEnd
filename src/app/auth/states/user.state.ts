import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserDTO } from "../../shared/swagger-generated";

@Injectable({
  providedIn: 'root'
})
export class UserState {
  private roleState: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  private isLoggedAdmin$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userState$: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);

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

  setLoggedAdmin(adminLogged: boolean): void{
    this.isLoggedAdmin$.next(adminLogged);
  }

  getLoggedAdmin(): boolean{
    return this.isLoggedAdmin$.getValue();
  }
}
