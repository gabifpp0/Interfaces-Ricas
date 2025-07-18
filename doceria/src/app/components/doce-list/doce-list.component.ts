import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyPipe } from '@angular/common';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    CurrencyPipe
  ],
  templateUrl: './doce-list.component.html',
  styleUrls: ['./doce-list.component.scss']
})
export class DoceListComponent {
  @Input() doces: Doce[] = [];
  @Output() editarDoce = new EventEmitter<Doce>();
  @Output() visualizarDoce = new EventEmitter<Doce>();
  @Output() excluirDoce = new EventEmitter<number>();
  @Output() novoDoce = new EventEmitter<void>();

  displayedColumns: string[] = ['nome', 'preco', 'disponivel', 'acoes'];

  onEditar(doce: Doce): void {
    this.editarDoce.emit(doce);
  }

  onVisualizar(doce: Doce): void {
    this.visualizarDoce.emit(doce);
  }

  onExcluir(id: number): void {
    this.excluirDoce.emit(id);
  }

  onNovo(): void {
    this.novoDoce.emit();
  }
}