import { Injectable } from '@angular/core';
import { Doce } from '../models/doce.model';

@Injectable({
  providedIn: 'root'
})
export class DoceService {
  private doces: Doce[] = [];
  private lastId = 0;

  constructor() {
    this.create({ nome: 'Brigadeiro', preco: 2.5, disponivel: true });
    this.create({ nome: 'Beijinho', preco: 2.0, disponivel: true });
    this.create({ nome: 'Pudim', preco: 15.0, disponivel: false });
  }

  create(doce: Omit<Doce, 'id'>): Doce {
    const newDoce: Doce = {
      id: ++this.lastId,
      ...doce
    };
    this.doces.push(newDoce);
    return newDoce;
  }

  readAll(): Doce[] {
    return [...this.doces];
  }

  update(id: number, update: Partial<Doce>): boolean {
    const index = this.doces.findIndex(d => d.id === id);
    if (index > -1) {
      this.doces[index] = { ...this.doces[index], ...update };
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const initialLength = this.doces.length;
    this.doces = this.doces.filter(d => d.id !== id);
    return this.doces.length !== initialLength;
  }
}