import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));

  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * Faz login e salva o token no localStorage
   */
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/auth/login', credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.loggedIn$.next(true);
      })
    );
  }

  /**
   * Remove o token e atualiza estado
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Retorna true se o usuário estiver autenticado
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  /**
   * Retorna o token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
