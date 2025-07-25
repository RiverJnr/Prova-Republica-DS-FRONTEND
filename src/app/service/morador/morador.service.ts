import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { MoradorSaldoDTO } from '../../model/morador-saldo.model';
import { MoradorDTO } from '../../model/morador.model';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class MoradorService {
  private baseUrl = `${API}/morador`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<MoradorDTO[]> {
    return this.http.get<MoradorDTO[]>(`${this.baseUrl}`);
  }

  getMorador(id: number | undefined): Observable<MoradorDTO> {
    return this.http.get<MoradorDTO>(`${this.baseUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  createMorador(morador: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, morador);
  }

  updateMorador(morador: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${morador.id}`, morador);
  }

  buscarSaldo(ids: number[]): Observable<MoradorSaldoDTO[]> {
    return this.http.post<MoradorSaldoDTO[]>(`${this.baseUrl}/saldos`, ids);
  }
}