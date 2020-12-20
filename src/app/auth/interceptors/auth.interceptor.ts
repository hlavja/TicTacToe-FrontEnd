import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';

import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { compileNgModule } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = AuthInterceptor.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request)
      .pipe(
        catchError(err => {
          /*if ((err instanceof HttpErrorResponse && err.status === 401)) {
            return this.handle401Error(request, next);
          } else if ((err instanceof HttpErrorResponse && err.status === 403 || err.status === 504)) {
            return this.handle403Error(request, next);
          } else {*/
            return throwError(err);
          //}
        })
      );
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    this.authService.doLogout();
    return of (null);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.authService.doLogout();
    return of (null);
  }

  private static addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
