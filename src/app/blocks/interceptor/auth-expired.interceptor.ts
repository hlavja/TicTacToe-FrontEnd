import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {LoginService} from "../../core/login/login.service";


@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  // @ts-ignore
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err.status === 401 && err.url && !err.url.includes('api/account')) {
          if (err.url.includes(this.loginService.logoutUrl())) {
            this.loginService.logoutInClient();
            return;
          }
          this.loginService.logout();
          this.router.navigate(['']);
        }
      })
    );
  }
}
