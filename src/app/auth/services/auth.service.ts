import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserState } from '../states/user.state';
import { Router } from '@angular/router';
import {
  LoginVM,
  JWTToken,
  User,
  UserJwtControllerService,
  AccountResourceService, UserDTO
} from 'src/app/shared/swagger-generated';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ParsedJwtToken } from '../models/parsed-jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'authenticationtoken';

  constructor(
    private http: HttpClient,
    private authorizeApi: UserJwtControllerService,
    private userState: UserState,
    private jwt: JwtHelperService,
    private router: Router,
    private accountService: AccountResourceService
  ) { }

  doLogin(credentials: LoginVM): Observable<boolean> {
    return this.authorizeApi.authorizeUsingPOST(credentials, 'body')
      .pipe(
        tap((tokens: JWTToken) => this.storeTokens(tokens)),
        map((tokens: JWTToken) => this.parseToken(tokens.id_token)),
        tap(parsedToken => this.setRolesFromToken(parsedToken)),
        mapTo(true),
        catchError(err => {
          return of<boolean>(false);
        })
     );
  }

  doLogout(): void {
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  isTokenExpired(){
    return this.jwt.isTokenExpired(this.getJwtToken());
  }

  getJwtToken(): string {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  getAdminLogged(): boolean{
    return this.userState.getLoggedAdmin();
  }


  getRoles(): UserModel {
    if(this.userState.getRole()){
      return this.userState.getRole();
    } else {
      return this.setRolesFromToken(this.parseToken(this.getJwtToken()));
    }
  }

  getUserState(): Observable<UserDTO> {
    /*if(this.userState.getUser()){
      return this.userState.getUser$().pipe(
        tap(console.log)
      ).toPromise();
    } else {
      return this.getUser().toPromise().then( (success) => {
        if(success){
          return this.userState.getUser();
        }
        return Promise.resolve(null);
      })
    }*/
    return this.userState.getUser$();
  }

  /*getUser(){
    return this.accountService.getAccountUsingGET("body")
      .pipe(
        tap(user => this.userState.setUser(user)),
        mapTo(true),
        catchError(err => {
          return of<boolean>(false);
        })
      );
  }*/

  private storeTokens(tokens: JWTToken): void {
    sessionStorage.setItem(this.JWT_TOKEN, tokens.id_token);
  }

  private setRolesFromToken(parsedToken: ParsedJwtToken): UserModel {
    if (parsedToken?.sub && parsedToken?.sub){
      const user: UserModel = {
        code: parsedToken.sub,
        roles: parsedToken.auth,
        id: parsedToken.userId
      };
      this.userState.setRole(user);
      return user;
    }
  }

  private parseToken(token: string): ParsedJwtToken {
    const parsedJwtToken = this.jwt.decodeToken(token);
    if (parsedJwtToken?.auth){
      parsedJwtToken.auth = parsedJwtToken.auth.split(',');
    }
    return parsedJwtToken;
  }

  private removeTokens() {
    sessionStorage.removeItem(this.JWT_TOKEN);
  }
}
