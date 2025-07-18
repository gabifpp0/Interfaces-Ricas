import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CurrencyPipe
  ],
  templateUrl: './doce-detail.component.html',
  styleUrls: ['./doce-detail.component.scss']
})
export class DoceDetailComponent {
  @Input() doce: Doce | null = null;
  @Input() isVisible: boolean = false;
  @Output() fechar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Doce>();

  onFechar(): void {
    this.fechar.emit();
  }

  onEditar(): void {
    if (this.doce) {
      this.editar.emit(this.doce);
    }
  }
}