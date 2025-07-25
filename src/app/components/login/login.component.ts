import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { MoradorService } from '../../service/morador/morador.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, private moradorService: MoradorService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.idUser);
        this.router.navigate(['/morador']);
      },
      error: () => {
        this.error = 'Credenciais inválidas';
      }
    });
  }
}