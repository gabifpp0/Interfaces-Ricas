import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Doce } from '../../models/doce.model';
import { DoceService } from '../../services/doce.service';

@Component({
  selector: 'app-doce-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    SkeletonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="doce-detail-container">
      <!-- Loading State -->
      <p-card *ngIf="loading" class="detail-card">
        <div class="detail-header">
          <p-skeleton width="300px" height="2.5rem"></p-skeleton>
          <div class="detail-actions">
            <p-skeleton width="80px" height="2.5rem"></p-skeleton>
            <p-skeleton width="80px" height="2.5rem"></p-skeleton>
            <p-skeleton width="80px" height="2.5rem"></p-skeleton>
          </div>
        </div>
        
        <p-divider></p-divider>
        
        <div class="detail-content">
          <div class="detail-row">
            <p-skeleton width="60px" height="1rem"></p-skeleton>
            <p-skeleton width="40px" height="1rem"></p-skeleton>
          </div>
          <div class="detail-row">
            <p-skeleton width="80px" height="1rem"></p-skeleton>
            <p-skeleton width="120px" height="1rem"></p-skeleton>
          </div>
          <div class="detail-row">
            <p-skeleton width="70px" height="1rem"></p-skeleton>
            <p-skeleton width="100px" height="1rem"></p-skeleton>
          </div>
          <div class="detail-row">
            <p-skeleton width="90px" height="1rem"></p-skeleton>
            <p-skeleton width="80px" height="1rem"></p-skeleton>
          </div>
        </div>
      </p-card>

      <!-- Doce Detail -->
      <p-card *ngIf="!loading && doce" class="detail-card">
        <div class="detail-header">
          <h1 class="detail-title">
            <i class="pi pi-heart-fill"></i>
            {{ doce.nome }}
          </h1>
          <div class="detail-actions">
            <p-button 
              label="Voltar" 
              icon="pi pi-arrow-left"
              [routerLink]="['/doces']"
              severity="secondary"
              size="small">
            </p-button>
            
            <p-button 
              label="Editar" 
              icon="pi pi-pencil"
              [routerLink]="['/doces', doce.id, 'editar']"
              severity="info"
              size="small">
            </p-button>
            
            <p-button 
              label="Excluir" 
              icon="pi pi-trash"
              (click)="confirmarExclusao()"
              severity="danger"
              size="small">
            </p-button>
          </div>
        </div>
        
        <p-divider></p-divider>
        
        <div class="detail-content">
          <div class="detail-row">
            <span class="detail-label">
              <i class="pi pi-hashtag"></i>
              ID:
            </span>
            <span class="detail-value id-badge">{{ doce.id }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">
              <i class="pi pi-heart-fill"></i>
              Nome do Doce:
            </span>
            <span class="detail-value doce-name">{{ doce.nome }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">
              <i class="pi pi-dollar"></i>
              Preço:
            </span>
            <span class="detail-value price">{{ doce.preco | currency:'BRL':'symbol':'1.2-2' }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">
              <i class="pi pi-check-circle"></i>
              Status:
            </span>
            <p-tag 
              [value]="doce.disponivel ? 'Disponível' : 'Esgotado'"
              [severity]="doce.disponivel ? 'success' : 'danger'"
              [icon]="doce.disponivel ? 'pi pi-check' : 'pi pi-times'">
            </p-tag>
          </div>

        </div>

        <p-divider></p-divider>

        <!-- Actions Footer -->
        <div class="detail-footer">
          <div class="footer-info">
            <i class="pi pi-info-circle"></i>
            <span>Doce artesanal criado com carinho</span>
          </div>
          <div class="footer-actions">
            <p-button 
              label="Criar Novo Doce" 
              icon="pi pi-plus"
              [routerLink]="['/doces/novo']"
              severity="success"
              [outlined]="true">
            </p-button>
          </div>
        </div>
      </p-card>

      <!-- Error State -->
      <p-card *ngIf="!loading && !doce" class="detail-card error-card">
        <div class="error-content">
          <i class="pi pi-exclamation-triangle error-icon"></i>
          <h2>Doce não encontrado</h2>
          <p>O doce solicitado não foi encontrado ou não existe mais.</p>
          <div class="error-actions">
            <p-button 
              label="Voltar para Lista" 
              icon="pi pi-arrow-left"
              [routerLink]="['/doces']"
              severity="secondary"
              size="large">
            </p-button>
            
            <p-button 
              label="Criar Novo Doce" 
              icon="pi pi-plus"
              [routerLink]="['/doces/novo']"
              severity="success"
              size="large">
            </p-button>
          </div>
        </div>
      </p-card>
    </div>

    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
  `,
  styles: [`
    .doce-detail-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .detail-card {
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .detail-title {
      color: #e91e63;
      margin: 0;
      font-size: 2.5rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .detail-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .detail-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(233, 30, 99, 0.1);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-weight: 600;
      color: #495057;
      min-width: 150px;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .detail-label i {
      color: #e91e63;
      width: 20px;
    }

    .detail-value {
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .id-badge {
      background: linear-gradient(135deg, #e91e63, #d81b60);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
    }

    .doce-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: #e91e63;
    }

    .price {
      font-weight: 700;
      color: #28a745;
      font-size: 1.4rem;
      background: rgba(40, 167, 69, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 12px;
    }

    .detail-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem 0;
      background: rgba(233, 30, 99, 0.05);
      margin: 0 -2rem -2rem -2rem;
      padding: 1.5rem 2rem;
    }

    .footer-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6c757d;
      font-style: italic;
    }

    .footer-info i {
      color: #e91e63;
    }

    .footer-actions {
      display: flex;
      gap: 0.5rem;
    }

    .error-card {
      text-align: center;
    }

    .error-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem;
    }

    .error-icon {
      font-size: 5rem;
      color: #dc3545;
    }

    .error-content h2 {
      color: #dc3545;
      margin: 0;
      font-size: 2rem;
    }

    .error-content p {
      color: #666;
      margin: 0;
      font-size: 1.2rem;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .detail-header {
        flex-direction: column;
        align-items: stretch;
      }

      .detail-actions {
        justify-content: center;
      }

      .detail-title {
        font-size: 2rem;
        text-align: center;
        justify-content: center;
      }

      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .detail-label {
        min-width: auto;
        font-size: 1rem;
      }

      .detail-footer {
        flex-direction: column;
        text-align: center;
      }

      .error-actions {
        flex-direction: column;
        align-items: center;
      }

      .error-actions p-button {
        width: 100%;
        max-width: 250px;
      }
    }
  `]
})
export class DoceDetailComponent implements OnInit {
  doce: Doce | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doceService: DoceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.carregarDoce();
  }

  carregarDoce() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doceService.getDoceById(+id).subscribe({
        next: (doce) => {
          this.doce = doce ?? null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar doce:', error);
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar detalhes do doce'
          });
        }
      });
    } else {
      this.loading = false;
    }
  }

  confirmarExclusao() {
    if (!this.doce) return;

    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o doce "${this.doce.nome}"}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.excluirDoce();
      }
    });
  }

  excluirDoce() {
    if (!this.doce) return;

    this.doceService.deleteDoce(this.doce.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Doce "${this.doce!.nome}" excluído com sucesso`
        });
        setTimeout(() => {
          this.router.navigate(['/doces']);
        }, 1500);
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