import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserState {
  private userState$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  private isLoggedAdmin$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setUser(user: UserModel): void {
    this.userState$.next(user);
  }

  get(): UserModel {
    return this.userState$.getValue();
  }

  setLoggedAdmin(adminLogged: boolean): void{
    this.isLoggedAdmin$.next(adminLogged);
  }

  getLoggedAdmin(): boolean{
    return this.isLoggedAdmin$.getValue();
  }
}
