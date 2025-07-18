// src/app/components/doce-create/doce-create.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DoceService } from '../../services/doce.service';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doce-create.component.html',
  styleUrls: ['./doce-create.component.scss']
})
export class DoceCreateComponent {
  doce: Doce = { nome: '', preco: 0, disponivel: true };
  @Output() doceCreated = new EventEmitter<Doce>();

  constructor(private doceService: DoceService) {}

  salvarDoce(): void {
    this.doceService.criar(this.doce).subscribe({
      next: (novoDoce) => {
        this.doceCreated.emit(novoDoce);
        this.doce = { nome: '', preco: 0, disponivel: true }; // Resetar formulário
      },
      error: (err) => console.error('Erro ao criar doce:', err)
    });
  }
}