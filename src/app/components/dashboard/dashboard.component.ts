import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DashboardDTO } from '../../model/dashboard.model';
import { DashboardService } from '../../service/dashboard/dashboard.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, NgChartsModule]
})
export class DashboardComponent implements OnInit {
  dashboard!: DashboardDTO;

  inicio = '';
  fim = '';

  chartTipoLabels: string[] = [];
  chartTipoData: number[] = [];

  chartMoradorLabels: string[] = [];
  chartMoradorData: number[] = [];

  constructor(private service: DashboardService) { }

  ngOnInit() {
    const hoje = new Date().toISOString().substring(0, 10);
    this.inicio = hoje;
    this.fim = hoje;
    this.buscar();
  }

  buscar() {
    this.service.obterDashboard(this.inicio, this.fim).subscribe((dto) => {
      this.dashboard = dto;

      this.chartTipoLabels = dto.gastosPorTipo.map((g) => g.tipo);
      this.chartTipoData = dto.gastosPorTipo.map((g) => g.total);

      this.chartMoradorLabels = dto.gastosPorMorador.map((g) => g.morador);
      this.chartMoradorData = dto.gastosPorMorador.map((g) => g.total);
    });
  }
}