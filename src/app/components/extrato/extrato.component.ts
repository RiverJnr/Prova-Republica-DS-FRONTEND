import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExtratoContaDTO } from '../../model/extrato-conta.model';
import { ExtratoFiltroDTO } from '../../model/extrato-filtro.model';
import { MoradorDTO } from '../../model/morador.model';
import { Situacao } from '../../model/situacao.enum';
import { ContaService } from '../../service/conta/conta.service';
import { MoradorService } from '../../service/morador/morador.service';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
  providers: [MoradorService, ContaService]
})
export class ExtratoComponent {
  filtro: ExtratoFiltroDTO = {
    inicio: '',
    fim: '',
    idMorador: 0,
    situacao: null
  };

  extratos: ExtratoContaDTO[] = [];
  situacoes = Object.values(Situacao);
  situacoesEditaveis = [Situacao.QUITADA, Situacao.PENDENTE, Situacao.CANCELADA];
  moradores: MoradorDTO[] = [];
  buscou = false;

  constructor(private contaService: ContaService, private moradorService: MoradorService) {
    this.moradorService.getAll().subscribe(m => this.moradores = m);
  }

  buscar() {
    this.contaService.buscarExtrato(this.filtro).subscribe({
      next: (dados) => {
        this.extratos = dados;
        this.buscou = true;
      },
      error: () => {
        this.extratos = [];
        this.buscou = true;
      }
    });
  }

  exportarPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Valor', 'Vencimento', 'Tipo', 'Responsável']],
      body: this.extratos.map(e => [
        e.id,
        `R$ ${e.valor.toFixed(2)}`,
        e.dataVencimento,
        e.tipo,
        e.moradorResponsavel
      ])
    });
    doc.save('extrato.pdf');
  }
}