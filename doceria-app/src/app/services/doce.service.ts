import { Injectable } from '@angular/core';
import { Doce } from '../models/doce.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoceService {
  private doces: Doce[] = [
    { id: 1, nome: 'Brigadeiro', preco: 2.5, disponivel: true },
    { id: 2, nome: 'Beijinho', preco: 2.0, disponivel: true }
  ];

  listar(): Observable<Doce[]> {
    return of(this.doces);
  }

  buscar(id: number): Observable<Doce | undefined> {
    return of(this.doces.find(d => d.id === id));
  }

  criar(doce: Doce): Observable<void> {
    doce.id = this.doces.length + 1;
    this.doces.push(doce);
    return of();
  }

  atualizar(doce: Doce): Observable<void> {
    const index = this.doces.findIndex(d => d.id === doce.id);
    if (index > -1) this.doces[index] = doce;
    return of();
  }

  remover(id: number): Observable<void> {
    this.doces = this.doces.filter(d => d.id !== id);
    return of();
  }
}
