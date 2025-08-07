import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginRequest, LoginResponse, Usuario, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://probable-space-acorn-5gq9v7jp9xgvcvw7g-8000.app.github.dev';
  private readonly TOKEN_KEY = 'doceria_access_token';
  private readonly REFRESH_TOKEN_KEY = 'doceria_refresh_token';
  private readonly USER_KEY = 'doceria_user';

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private tokenRefreshTimer: any;

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }


  private initializeAuth(): void {
    const token = this.getToken();
    const user = this.getStoredUser();

    if (token && user && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      this.scheduleTokenRefresh();
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login/`, credentials).pipe(
      tap(response => {
        console.log('Login bem-sucedido, redirecionando para /doces', response);
        this.setAuthData(response);
        this.scheduleTokenRefresh();
        this.router.navigate(['/doces']);
      }),
      catchError(this.handleError)
    );
  }

  private getUserProfile(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/user/profile/`);
  }

  register(userData: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<any>(`${this.API_URL}/register/`, userData)
      .pipe(
        switchMap(() => {
          return this.login({
            username: userData.username,
            password: userData.password
          });
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.clearAuthData();
    
    this.cancelTokenRefresh();
    
    this.router.navigate(['/auth/login']);
    
    console.log('Logout realizado com sucesso');
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      this.clearAuthData();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Sessão expirada. Por favor faça login novamente.'));
    }


    const request: RefreshTokenRequest = { refresh: refreshToken };

    return this.http.post<TokenResponse>(`${this.API_URL}/token/refresh/`, request)
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.access);
          if (response.refresh) {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh);
          }
          this.scheduleTokenRefresh();
        }),
        catchError(error => {
          this.clearAuthData();
          this.router.navigate(['/auth/login']);
          return throwError(() => error);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }


  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.is_staff === true || user?.is_superuser === true;
  }

  
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    if (role === 'admin') {
      return this.isAdmin();
    }
    return true; 
  }

  getDisplayName(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    }
    return user.username;
  }

 
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

 
  private getTokenExpirationTime(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp;
    } catch (error) {
      return 0;
    }
  }

  private scheduleTokenRefresh(): void {
    this.cancelTokenRefresh();
    
    const token = this.getToken();
    if (!token) return;

    const expirationTime = this.getTokenExpirationTime(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilRefresh = (expirationTime - currentTime - 300) * 1000; 

    if (timeUntilRefresh > 0) {
      this.tokenRefreshTimer = timer(timeUntilRefresh).subscribe(() => {
        this.refreshToken().subscribe({
          error: (error) => {
            console.error('Erro ao renovar token:', error);
            this.logout();
          }
        });
      });
    }
  }

  
  private cancelTokenRefresh(): void {
    if (this.tokenRefreshTimer) {
      this.tokenRefreshTimer.unsubscribe();
      this.tokenRefreshTimer = null;
    }
  }

  
  private setAuthData(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

 
  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private getStoredUser(): Usuario | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error?.detail) {
      errorMessage = error.error.detail;
    } else if (error.error?.non_field_errors) {
      errorMessage = error.error.non_field_errors[0];
    } else if (error.error?.username) {
      errorMessage = `Username: ${error.error.username[0]}`;
    } else if (error.error?.password) {
      errorMessage = `Senha: ${error.error.password[0]}`;
    } else if (error.error?.email) {
      errorMessage = `Email: ${error.error.email[0]}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}