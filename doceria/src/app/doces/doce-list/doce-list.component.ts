// src/app/components/doce-list/doce-list.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoceService } from '../../services/doce.service';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doce-list.component.html',
  styleUrls: ['./doce-list.component.scss']
})
export class DoceListComponent implements OnInit {
  doces: Doce[] = [];
  @Output() editDoce = new EventEmitter<Doce>();
  @Output() deleteDoce = new EventEmitter<number>();
  @Output() viewDoce = new EventEmitter<Doce>();

  constructor(private doceService: DoceService) {}

  ngOnInit(): void {
    this.carregarDoces();
  }

  carregarDoces(): void {
    this.doceService.listar().subscribe({
      next: (data) => this.doces = data,
      error: (err) => console.error('Erro ao carregar doces:', err)
    });
  }

  onEdit(doce: Doce): void {
    this.editDoce.emit(doce);
  }

  onDelete(id: number): void {
    this.deleteDoce.emit(id);
  }

  onView(doce: Doce): void {
    this.viewDoce.emit(doce);
  }
}