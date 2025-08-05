import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doce } from '../models/doce.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoceService {
  private apiUrl = 'https://probable-space-acorn-5gq9v7jp9xgvcvw7g-8000.app.github.dev/doces';

  constructor(private http: HttpClient) {}

  getDoces(): Observable<Doce[]> {
    return this.http.get<Doce[]>(this.apiUrl + '/');
  }

  getDoceById(id: number): Observable<Doce> {
    return this.http.get<Doce>(`${this.apiUrl}/${id}/`);
  }

  criarDoce(doce: Omit<Doce, 'id'>): Observable<Doce> {
    return this.http.post<Doce>(this.apiUrl + '/', doce);
  }

  updateDoce(id: number, doce: Doce): Observable<Doce> {
    return this.http.put<Doce>(`${this.apiUrl}/${id}/`, doce);
  }

  deleteDoce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
