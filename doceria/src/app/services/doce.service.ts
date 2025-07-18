import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getDoceById(id: number): Doce | undefined {
    return this.doces.find(doce => doce.id === id);
  }

  addDoce(doce: Omit<Doce, 'id'>): void {
    const novoDoce: Doce = {
      ...doce,
      id: this.nextId++
    };
    this.doces.push(novoDoce);
    this.docesSubject.next([...this.doces]);
  }

  updateDoce(doceAtualizado: Doce): void {
    const index = this.doces.findIndex(doce => doce.id === doceAtualizado.id);
    if (index !== -1) {
      this.doces[index] = doceAtualizado;
      this.docesSubject.next([...this.doces]);
    }
  }

  deleteDoce(id: number): void {
    this.doces = this.doces.filter(doce => doce.id !== id);
    this.docesSubject.next([...this.doces]);
  }
}