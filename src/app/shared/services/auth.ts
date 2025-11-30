import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, catchError, throwError } from 'rxjs'; // Додали catchError, throwError
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public isAuthenticated$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  register(userData: any) {
    return this.http.post('register', userData).pipe(
      catchError(err => throwError(() => err))
    );
  }

  login(userData: any) {
    return this.http.post<any>('login', userData).pipe(
      tap((response) => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          this.isAuthenticated$.next(true);
          this.router.navigate(['/']);
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}