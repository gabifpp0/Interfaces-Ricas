import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-detail',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './doce-detail.component.html',
  styleUrls: ['./doce-detail.component.scss']
})
export class DoceDetailComponent {
  @Input() doce: Doce | null = null;
  @Input() isVisible: boolean = false;
  @Output() fechar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Doce>();

  get dataAtual(): Date {
    return new Date();
  }

  onFechar(): void {
    this.fechar.emit();
  }

  onEditar(): void {
    if (this.doce) {
      this.editar.emit(this.doce);
    }
  }

  getSeverity(disponivel: boolean): 'success' | 'danger' {
    return disponivel ? 'success' : 'danger';
  }
}