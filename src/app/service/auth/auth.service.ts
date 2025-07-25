import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('idUser', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('idUser');
    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: any = jwtDecode(token);
      const roles: string[] = payload.roles || [];
      return roles.includes("ROLE_" + role);
    } catch (e) {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}