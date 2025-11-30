import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public isAuthenticated$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  register(userData: any) {
    return this.http.post('register', userData);
  }

  login(userData: any) {
    return this.http.post<any>('login', userData).pipe(
      tap((response) => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          this.isAuthenticated$.next(true);
          this.router.navigate(['/']);
        }
      })
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