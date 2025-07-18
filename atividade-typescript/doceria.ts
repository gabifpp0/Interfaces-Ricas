export interface Produto {
  calcularPreco(): number;
}

export class Bolo implements Produto {
  sabor: string;
  pesoKg: number;
  precoPorKg: number;

  constructor(sabor: string, pesoKg: number, precoPorKg: number) {
    this.sabor = sabor;
    this.pesoKg = pesoKg;
    this.precoPorKg = precoPorKg;
  }

  calcularPreco(): number {
    return this.pesoKg * this.precoPorKg;
  }
}

export class Doce implements Produto {
  tipo: string;
  quantidade: number;
  precoUnitario: number;

  constructor(tipo: string, quantidade: number, precoUnitario: number) {
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }

  calcularPreco(): number {
    return this.quantidade * this.precoUnitario;
  }
}