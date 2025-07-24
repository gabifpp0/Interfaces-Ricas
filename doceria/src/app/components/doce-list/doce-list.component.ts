import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Doce } from '../../models/doce.model';
import { DoceService } from '../../services/doce.service';

@Component({
  selector: 'app-doce-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    TagModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './doce-list.component.html',
  styleUrls: ['./doce-list.component.scss'],

})
export class DoceListComponent implements OnInit {
  doces: Doce[] = [];
  loading = true;

  constructor(
    private router: Router,
    private doceService: DoceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.doceService.getDoces().subscribe({
      next: (doces) => {
        console.log('Doces recebidos:', doces);
        this.doces = doces;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar doces:', error);
        this.loading = false;
      }
    });
  }
  
  carregarDoces() {
    this.loading = true;
    this.doceService.getDoces().subscribe({
      next: (doces) => {
        this.doces = doces;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar doces:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar lista de doces'
        });
        this.loading = false;
      }
    });
  }

  confirmarExclusao(doce: Doce) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o doce "${doce.nome}"}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.excluirDoce(doce);
      }
    });
  }

  excluirDoce(doce: Doce) {
    this.doceService.deleteDoce(doce.id).subscribe({
      next: () => {
        this.doces = this.doces.filter(d => d.id !== doce.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Doce "${doce.nome}" excluído com sucesso`
        });
      },
      error: (error) => {
        console.error('Erro ao excluir doce:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir doce'
        });
      }
    });
  }
}