import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContaDTO } from '../../model/conta.model';
import { MoradorDTO } from '../../model/morador.model';
import { RateioDTO } from '../../model/rateio.model';
import { Situacao, situacaoLabels } from '../../model/situacao.enum';
import { TipoDTO } from '../../model/tipo.model';
import { AuthService } from '../../service/auth/auth.service';
import { ContaService } from '../../service/conta/conta.service';
import { MoradorService } from '../../service/morador/morador.service';
import { TipoService } from '../../service/tipo/tipo.service';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conta.component.html',
  providers: [TipoService, MoradorService, ContaService]
})
export class ContaComponent implements OnInit {
  contas: ContaDTO[] = [];
  tipos: TipoDTO[] = [];
  moradores: MoradorDTO[] = [];
  idMoradorResponsavel = 0;
  situacoes = Object.values(Situacao);
  situacaoLabels = situacaoLabels;
  situacoesEditaveis = [Situacao.EM_ABERTO, Situacao.PAGO];
  conta: ContaDTO = {
    id: undefined,
    valor: 0,
    dataVencimento: '',
    situacao: Situacao.PENDENTE,
    observacao: '',
    idTipo: 0,
    idMoradorResponsavel: 0,
    rateios: []
  };
  saldoPendente: number = 0;

  constructor(
    private contaService: ContaService,
    private tipoService: TipoService,
    private moradorService: MoradorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.moradorService.getByUserId(this.authService.getUser()).subscribe(m => {
      this.idMoradorResponsavel = m.id;
      this.buscarSaldoPendente();
    });
    this.tipoService.getAll().subscribe(t => this.tipos = t);
    this.moradorService.getAll().subscribe(m => this.moradores = m);
    this.contaService.getAll().subscribe(c => {
      this.contas = c
    });
  }

  adicionarRateio() {
    this.conta.rateios.push({
      id: undefined,
      valor: 0,
      situacao: Situacao.EM_ABERTO,
      idMorador: 0,
      idConta: 0
    });
  }

  removerRateio(index: number) {
    this.conta.rateios.splice(index, 1);
  }

  onSubmit() {
    const contaParaSalvar: ContaDTO = {
      ...this.conta,
      idMoradorResponsavel: this.idMoradorResponsavel
    };

    if (contaParaSalvar.id) {
      this.contaService.update(contaParaSalvar).subscribe(() => {
        this.ngOnInit();
        this.conta = this.criarNovaConta();
      });
    } else {
      this.contaService.create(contaParaSalvar).subscribe(() => {
        this.ngOnInit();
        this.conta = this.criarNovaConta();
      });
    }
  }

  private criarNovaConta(): ContaDTO {
    return {
      id: undefined,
      valor: 0,
      dataVencimento: '',
      situacao: Situacao.PENDENTE,
      observacao: '',
      idTipo: 0,
      idMoradorResponsavel: this.idMoradorResponsavel,
      rateios: []
    };
  }

  getTipoNome(id: number): string {
    const tipo = this.tipos.find(t => t.id === id);
    return tipo ? tipo.nome : '';
  }

  getMoradorNome(id: number): string {
    const morador = this.moradores.find(m => m.id === id);
    return morador ? morador.nome : '';
  }

  buscarSaldoPendente(): void {
    this.moradorService.buscarSaldo([this.idMoradorResponsavel]).subscribe({
      next: (res) => {
        const saldoDTO = res[0];
        this.saldoPendente = saldoDTO?.saldoPendente ?? 0;
      },
      error: () => {
        this.saldoPendente = 0;
      }
    });
  }

  temRateioDoMorador(conta: ContaDTO): boolean {
    return conta.rateios?.some(r => r.idMorador === this.idMoradorResponsavel);
  }

  atualizarRateio(rateio: RateioDTO): void {
    this.contaService.atualizarMeusRateios(rateio.id, rateio).subscribe({
      next: () => {
        alert('Situação do rateio atualizada com sucesso!');
        this.ngOnInit();
      },
      error: () => alert('Erro ao atualizar situação do rateio.')
    });
  }
}