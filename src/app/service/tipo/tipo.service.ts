import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { TipoDTO } from '../../model/tipo.model';

const API = environment.apiUrl;

export class TipoService {
  private http = inject(HttpClient);

  getTipos() {
    return this.http.get<{ id: number; nome: string }[]>(`${API}/tipos`);
  }
  
  addTipo(tipo: { nome: string }) {
    return this.http.post(`${API}/tipos`, tipo);
  }
  
  removeTipo(id: number) {
    return this.http.delete(`${API}/tipos/${id}`);
  }

  getAll(): Observable<TipoDTO[]> {
    return this.http.get<TipoDTO[]>(`${API}/tipos`);
  }
}