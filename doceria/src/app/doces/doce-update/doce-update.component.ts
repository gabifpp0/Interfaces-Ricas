// src/app/components/doce-update/doce-update.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DoceService } from '../../services/doce.service';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doce-update.component.html',
  styleUrls: ['./doce-update.component.scss']
})
export class DoceUpdateComponent {
  @Input() doce: Doce = { nome: '', preco: 0, disponivel: true };
  @Output() doceUpdated = new EventEmitter<Doce>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private doceService: DoceService) {}

  salvarDoce(): void {
    this.doceService.atualizar(this.doce).subscribe({
      next: (updatedDoce) => this.doceUpdated.emit(updatedDoce),
      error: (err) => console.error('Erro ao atualizar doce:', err)
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}