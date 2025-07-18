import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doce } from '../models/doce.model';

@Injectable({
  providedIn: 'root'
})
export class DoceService {
  private apiUrl = 'http://localhost:3000/api/doces'; // Ajuste para o URL do seu backend

  constructor(private http: HttpClient) {}

  listar(): Observable<Doce[]> {
    return this.http.get<Doce[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Doce> {
    return this.http.get<Doce>(`${this.apiUrl}/${id}`);
  }

  criar(doce: Doce): Observable<Doce> {
    return this.http.post<Doce>(this.apiUrl, doce, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  atualizar(doce: Doce): Observable<Doce> {
    return this.http.put<Doce>(`${this.apiUrl}/${doce.id}`, doce, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}