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
  template: `
    <div class="doce-list-container">
      <!-- Toolbar -->
      <p-toolbar class="list-toolbar">
        <div class="p-toolbar-group-start">
          <h1 class="list-title">
            <i class="pi pi-heart-fill"></i>
            Meus Doces Artesanais
          </h1>
        </div>
        
        <div class="p-toolbar-group-end">
          <p-button 
            label="Criar Novo Doce" 
            icon="pi pi-plus"
            [routerLink]="['/doces/novo']"
            severity="success"
            size="large">
          </p-button>
        </div>
      </p-toolbar>

      <!-- Tabela de Doces -->
      <p-card class="table-card">
        <p-table 
          [value]="doces" 
          [loading]="loading"
          [rows]="10"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} doces"
          [globalFilterFields]="['nome', 'preco']"
          #dt>
          
          <!-- Header da Tabela -->
          <ng-template pTemplate="caption">
            <div class="table-header">
              <span class="table-title">
                <i class="pi pi-list"></i>
                Catálogo de Doces
              </span>
              <div class="search-container">
                <i class="pi pi-search search-icon"></i>
      
              </div>
            </div>
          </ng-template>

          <!-- Colunas -->
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="id" style="width: 80px;">
                ID <p-sortIcon field="id"></p-sortIcon>
              </th>
              <th pSortableColumn="nome">
                Nome do Doce <p-sortIcon field="nome"></p-sortIcon>
              </th>
           
              <th pSortableColumn="preco" style="width: 120px;">
                Preço <p-sortIcon field="preco"></p-sortIcon>
              </th>
              <th pSortableColumn="disponivel" style="width: 120px;">
                Status <p-sortIcon field="disponivel"></p-sortIcon>
              </th>
              <th style="width: 150px;">Ações</th>
            </tr>
          </ng-template>

          <!-- Linhas -->
          <ng-template pTemplate="body" let-doce>
            <tr>
              <td class="text-center">
                <span class="doce-id">{{ doce.id }}</span>
              </td>
              <td>
                <div class="doce-info">
                  <i class="pi pi-heart-fill doce-icon"></i>
                  <strong>{{ doce.nome }}</strong>
                </div>
              </td>
        
              <td>
                <span class="price">{{ doce.preco | currency:'BRL':'symbol':'1.2-2' }}</span>
              </td>
              <td>
                <p-tag 
                  [value]="doce.disponivel ? 'Disponível' : 'Esgotado'"
                  [severity]="doce.disponivel ? 'success' : 'danger'"
                  [icon]="doce.disponivel ? 'pi pi-check' : 'pi pi-times'">
                </p-tag>
              </td>
              <td class="text-center">
                <div class="action-buttons">
                  <p-button 
                    icon="pi pi-eye" 
                    [routerLink]="['/doces', doce.id]"
                    severity="info"
                    size="small"
                    [rounded]="true"
                    pTooltip="Ver Detalhes"
                    tooltipPosition="top">
                  </p-button>
                  
                  <p-button 
                    icon="pi pi-pencil" 
                    [routerLink]="['/doces', doce.id, 'editar']"
                    severity="warning"
                    size="small"
                    [rounded]="true"
                    pTooltip="Editar Doce"
                    tooltipPosition="top">
                  </p-button>
                  
                  <p-button 
                    icon="pi pi-trash" 
                    (click)="confirmarExclusao(doce)"
                    severity="danger"
                    size="small"
                    [rounded]="true"
                    pTooltip="Excluir Doce"
                    tooltipPosition="top">
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>

          <!-- Empty State -->
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="6" class="empty-message">
                <div class="empty-content">
                  <i class="pi pi-heart empty-icon"></i>
                  <h3>Nenhum doce encontrado</h3>
                  <p>Que tal começar criando seu primeiro doce artesanal?</p>
                  <p-button 
                    label="Criar Primeiro Doce" 
                    icon="pi pi-plus"
                    [routerLink]="['/doces/novo']"
                    severity="success"
                    size="large">
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>

    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
  `,
  styles: [`
    .doce-list-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .list-toolbar {
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #fff, #ffeef3) !important;
    }

    .list-title {
      color: #e91e63;
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .table-card {
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem 0;
    }

    .table-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #495057;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      color: #6c757d;
      z-index: 1;
    }

    .search-input {
      padding-left: 2.5rem !important;
      min-width: 300px;
      border-radius: 25px !important;
    }

    .doce-id {
      background: linear-gradient(135deg, #e91e63, #d81b60);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .doce-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .doce-icon {
      color: #e91e63;
      font-size: 1rem;
    }



    .price {
      font-weight: 700;
      color: #28a745;
      font-size: 1.1rem;
      background: rgba(40, 167, 69, 0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
    }

    .action-buttons {
      display: flex;
      gap: 0.25rem;
      justify-content: center;
      align-items: center;
    }

    .empty-message {
      text-align: center;
      padding: 4rem 1rem;
    }

    .empty-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .empty-icon {
      font-size: 5rem;
      color: #e91e63;
      opacity: 0.6;
    }

    .empty-content h3 {
      color: #495057;
      margin: 0;
      font-size: 1.5rem;
    }

    .empty-content p {
      color: #6c757d;
      margin: 0;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .list-title {
        font-size: 1.5rem;
      }

      .table-header {
        flex-direction: column;
        align-items: stretch;
      }

      .search-input {
        min-width: 100%;
      }

      .action-buttons {
        flex-wrap: wrap;
      }

      .doce-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
    }
  `]
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

  ngOnInit() {
    this.carregarDoces();
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