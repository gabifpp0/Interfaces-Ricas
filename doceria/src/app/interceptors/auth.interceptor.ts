import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // URLs que não precisam de token
    const skipUrls = [
      '/login/',
      '/register/',
      '/token/refresh/',
      '/token/blacklist/'
    ];

    // Verifica se a URL deve ser ignorada
    if (skipUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    // Adiciona o token às requisições autorizadas
    const authReq = this.addTokenToRequest(request);

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.authService.getToken();
    return token
      ? request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      : request;
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(tokenResponse => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokenResponse.access);
          return next.handle(this.addTokenToRequest(request));
        }),
        catchError(error => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenToRequest(request)))
      );
    }
  }
}