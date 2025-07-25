import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ehAdmin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.ehAdmin = this.authService.hasRole('ADMIN');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarPara(caminho: string) {
    this.router.navigate([caminho]);
  }
}
