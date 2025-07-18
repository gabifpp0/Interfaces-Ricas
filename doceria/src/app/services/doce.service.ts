import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Doce } from '../models/doce.model';

@Injectable({
  providedIn: 'root'
})
export class DoceService {
  private doces: Doce[] = [
    { id: 1, nome: 'Brigadeiro', preco: 2.50, disponivel: true },
    { id: 2, nome: 'Beijinho', preco: 2.50, disponivel: true },
    { id: 3, nome: 'Trufa de Chocolate', preco: 4.00, disponivel: false },
    { id: 4, nome: 'Pudim', preco: 15.00, disponivel: true },
    { id: 5, nome: 'Quindim', preco: 3.00, disponivel: true },
    { id: 6, nome: 'Bem-casado', preco: 5.50, disponivel: false }
  ];

  private docesSubject = new BehaviorSubject<Doce[]>(this.doces);
  private nextId = 7;

  getDoces(): Observable<Doce[]> {
    return this.docesSubject.asObservable();
  }

  getDoceById(id: number): Observable<Doce | undefined> {
    const doce = this.doces.find(doce => doce.id === id);
    return of(doce); 
  }

  addDoce(doce: Omit<Doce, 'id'>): Observable<Doce> {
    const novoDoce: Doce = {
      ...doce,
      id: this.nextId++
    };
    this.doces.push(novoDoce);
    this.docesSubject.next([...this.doces]);
    return of(novoDoce); 
  }

  updateDoce(id: number, doce: Doce): Observable<Doce> {
  const index = this.doces.findIndex(d => d.id === id);
  if (index !== -1) {
    const atualizado = { ...doce, id };
    this.doces[index] = atualizado;
    this.docesSubject.next([...this.doces]);
    return of(atualizado);
  }
  return of(undefined as any); 
}


  deleteDoce(id: number): Observable<void> {
    this.doces = this.doces.filter(doce => doce.id !== id);
    this.docesSubject.next([...this.doces]);
    return of();
  }
}
