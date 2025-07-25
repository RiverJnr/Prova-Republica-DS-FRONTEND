import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { TipoService } from '../../service/tipo/tipo.service';

@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos.component.html',
  providers: [TipoService]
})
export class TiposComponent {
  tipos: { id: number; nome: string }[] = [];
  novoTipo: string = '';
  ehAdmin = false;

  constructor(private tipoService: TipoService, private authService: AuthService) { }


  ngOnInit() {
    this.carregarTipos();
    this.ehAdmin = this.authService.hasRole('ADMIN');
  }

  carregarTipos() {
    this.tipoService.getTipos().subscribe({
      next: data => this.tipos = data
    });
  }

  adicionarTipo() {
    if (!this.novoTipo.trim()) return;

    this.tipoService.addTipo({ nome: this.novoTipo }).subscribe({
      next: () => {
        this.novoTipo = '';
        this.carregarTipos();
      }
    });
  }

  removerTipo(id: number) {
    this.tipoService.removeTipo(id).subscribe({
      next: () => this.carregarTipos()
    });
  }
}
