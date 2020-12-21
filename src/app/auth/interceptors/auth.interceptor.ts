import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';

import { catchError} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = AuthInterceptor.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request)
      .pipe(
        catchError(err => {
          if ((err instanceof HttpErrorResponse && err.status === 504)) {
            return this.handle504Error(request, next);
          } else {
            return throwError(err);
          }
        })
      );
  }


  private handle504Error(request: HttpRequest<any>, next: HttpHandler) {
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
