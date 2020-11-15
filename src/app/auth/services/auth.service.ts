import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserState } from '../states/user.state';
import { Router } from '@angular/router';
import {LoginVM, JWTToken, User, UserJwtControllerService} from 'src/app/shared/swagger-generated';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ParsedJwtToken } from '../models/parsed-jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'token';

  constructor(
    private http: HttpClient,
    private authorizeApi: UserJwtControllerService,
    private userState: UserState,
    private jwt: JwtHelperService,
    private router: Router
  ) { }

  doLogin(credentials: LoginVM): Observable<boolean> {
    return this.authorizeApi.authorizeUsingPOST(credentials, 'body')
      .pipe(
        tap((tokens: JWTToken) => this.storeTokens(tokens)),
        map((tokens: JWTToken) => this.parseToken(tokens.idToken)),
        tap(parsedToken => this.setUserFromToken(parsedToken)),
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
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getAdminLogged(): boolean{
    return this.userState.getLoggedAdmin();
  }

  getUser(): UserModel {
    if(this.userState.get()){
      return this.userState.get();
    } else {
      return this.setUserFromToken(this.parseToken(this.getJwtToken()));
    }
  }

  private storeTokens(tokens: JWTToken): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.idToken);
  }

  private setUserFromToken(parsedToken: ParsedJwtToken): UserModel {
    if (parsedToken?.sub && parsedToken?.sub){
      const user: UserModel = {
        code: parsedToken.sub,
        roles: parsedToken.auth,
        id: parsedToken.userId
      };
      this.userState.setUser(user);
      /*if(user.roles.indexOf("ROLE_USER") > -1){
        this.userState.setLoggedAdmin(true);
      }*/
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
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
