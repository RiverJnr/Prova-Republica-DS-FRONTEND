import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoradorDTO } from '../../model/morador.model';
import { AuthService } from '../../service/auth/auth.service';
import { MoradorService } from '../../service/morador/morador.service';

@Component({
  selector: 'app-morador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './morador.component.html'
})
export class MoradorComponent {
  morador: MoradorDTO = {
    id: undefined,
    nome: '',
    cpf: '',
    celular: '',
    contato: '',
    email: '',
    foto: '',
    dataNascimento: ''
  };

  constructor(
    private moradorService: MoradorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }

    this.moradorService.getByUserId(user).subscribe({
      next: (morador) => {
        this.morador = morador;
      },
      error: () => {
        console.log('Nenhum morador encontrado para este usuário');
      }
    });
  }

  onSubmit() {
    const moradorParaSalvar: MoradorDTO = {
      ...this.morador,
      cpf: this.morador.cpf.replace(/\D/g, ''),
      celular: this.morador.celular.replace(/\D/g, '')
    };

    if (moradorParaSalvar.id) {
      this.moradorService.updateMorador(moradorParaSalvar).subscribe({
        next: moradorAtualizado => {
          this.morador = moradorAtualizado;
        }
      });
    } else {
      this.moradorService.createMorador(moradorParaSalvar).subscribe({
        next: moradorCriado => {
          this.morador = moradorCriado;
        }
      });
    }
  }

  formatarCPF(valor: string): string {
    const numeros = valor.replace(/\D/g, '');
    return numeros
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2-$3')
      .slice(0, 14);
  }

  formatarCelular(valor: string): string {
    const numeros = valor.replace(/\D/g, '');
    return numeros
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }
}