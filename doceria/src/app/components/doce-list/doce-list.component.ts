import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
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

  getSeverity(disponivel: boolean): 'success' | 'danger' {
    return disponivel ? 'success' : 'danger';
  }
}