import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private http: HttpClient, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const body = { username: this.username, password: this.password };

    this.http.post(`${environment.apiUrl}/auth/register`, body).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.error = 'Erro ao registrar. Tente outro nome de usuário.')
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
