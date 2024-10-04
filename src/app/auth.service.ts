import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.backendUrl}/api/auth`; // Adjust this to your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get the saved token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;
    }
    return null;
  }
}
