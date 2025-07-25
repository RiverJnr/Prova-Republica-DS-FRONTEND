import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { ContaDTO } from '../../model/conta.model';
import { ExtratoContaDTO } from '../../model/extrato-conta.model';
import { ExtratoFiltroDTO } from '../../model/extrato-filtro.model';
import { RateioDTO } from '../../model/rateio.model';

@Injectable({ providedIn: 'root' })
export class ContaService {
  private apiUrl = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ContaDTO[]> {
    return this.http.get<ContaDTO[]>(this.apiUrl);
  }

  create(conta: ContaDTO): Observable<ContaDTO> {
    return this.http.post<ContaDTO>(this.apiUrl, conta);
  }

  update(conta: ContaDTO): Observable<ContaDTO> {
    return this.http.put<ContaDTO>(`${this.apiUrl}/${conta.id}`, conta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarExtrato(filtro: ExtratoFiltroDTO): Observable<ExtratoContaDTO[]> {
    return this.http.post<ExtratoContaDTO[]>(`${this.apiUrl}/extrato`, filtro);
  }

  atualizarMeusRateios(idRateio: number | undefined, rateio: RateioDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/rateios/${idRateio}`, rateio);
  }
}