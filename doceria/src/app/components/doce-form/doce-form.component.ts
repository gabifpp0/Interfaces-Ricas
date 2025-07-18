import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';

import { Doce } from '../../models/doce.model';
import { DoceService } from '../../services/doce.service';

@Component({
  selector: 'app-doce-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    DividerModule
  ],
  providers: [MessageService],
  template: `
    <div class="doce-form-container">
      <p-card class="form-card">
        <div class="form-header">
          <h1 class="form-title">
            <i class="pi" [class]="isEditMode ? 'pi-pencil' : 'pi-plus'"></i>
            {{ isEditMode ? 'Editar Doce' : 'Criar Novo Doce' }}
          </h1>
          
          <p-button 
            label="Voltar" 
            icon="pi pi-arrow-left"
            [routerLink]="['/doces']"
            severity="secondary"
            size="small">
          </p-button>
        </div>

        <p-divider></p-divider>

        <form [formGroup]="doceForm" (ngSubmit)="onSubmit()" class="doce-form">
          <!-- Nome do Doce -->
          <div class="form-field">
            <label for="nome" class="form-label">
              <i class="pi pi-heart-fill"></i>
              Nome do Doce <span class="required">*</span>
            </label>
            <input 
              pInputText 
              id="nome"
              formControlName="nome"
              placeholder="Ex: Brigadeiro Gourmet, Beijinho de Coco..."
              [class.ng-invalid]="doceForm.get('nome')?.invalid && doceForm.get('nome')?.touched"
              class="w-full" />
            
            <small 
              *ngIf="doceForm.get('nome')?.invalid && doceForm.get('nome')?.touched" 
              class="error-message">
              <span *ngIf="doceForm.get('nome')?.errors?.['required']">Nome do doce é obrigatório</span>
              <span *ngIf="doceForm.get('nome')?.errors?.['minlength']">Nome deve ter pelo menos 2 caracteres</span>
            </small>
          </div>


          <!-- Preço -->
          <div class="form-field">
            <label for="preco" class="form-label">
              <i class="pi pi-dollar"></i>
              Preço <span class="required">*</span>
            </label>
            <p-inputNumber
              inputId="preco"
              formControlName="preco"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              placeholder="0,00"
              [min]="0"
              [maxFractionDigits]="2"
              [class.ng-invalid]="doceForm.get('preco')?.invalid && doceForm.get('preco')?.touched"
              styleClass="w-full">
            </p-inputNumber>
            
            <small 
              *ngIf="doceForm.get('preco')?.invalid && doceForm.get('preco')?.touched" 
              class="error-message">
              <span *ngIf="doceForm.get('preco')?.errors?.['required']">Preço é obrigatório</span>
              <span *ngIf="doceForm.get('preco')?.errors?.['min']">Preço deve ser maior que zero</span>
            </small>
          </div>

          <!-- Disponível -->
          <div class="form-field">
            <div class="checkbox-wrapper">
              <p-checkbox 
                inputId="disponivel"
                formControlName="disponivel"
                [binary]="true">
              </p-checkbox>
              <label for="disponivel" class="checkbox-label">
                <i class="pi pi-check-circle"></i>
                Doce disponível para venda
              </label>
            </div>
            <small class="field-help">
              Marque esta opção se o doce está disponível no estoque
            </small>
          </div>

          <p-divider></p-divider>

          <!-- Ações -->
          <div class="form-actions">
            <p-button 
              label="Cancelar" 
              icon="pi pi-times"
              [routerLink]="['/doces']"
              severity="secondary"
              type="button"
              size="large">
            </p-button>
            
            <p-button 
              [label]="isEditMode ? 'Atualizar Doce' : 'Criar Doce'" 
              [icon]="loading ? 'pi pi-spin pi-spinner' : (isEditMode ? 'pi pi-check' : 'pi pi-save')"
              type="submit"
              [disabled]="doceForm.invalid || loading"
              [severity]="isEditMode ? 'info' : 'success'"
              size="large">
            </p-button>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
  `,
  styles: [`
    .doce-form-container {
      max-width: 700px;
      margin: 0 auto;
    }

    .form-card {
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .form-title {
      color: #e91e63;
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .doce-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 1rem;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-label {
      font-weight: 600;
      color: #495057;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-label i {
      color: #e91e63;
    }

    .required {
      color: #dc3545;
      font-weight: 700;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(233, 30, 99, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(233, 30, 99, 0.2);
    }

    .checkbox-label {
      font-weight: 500;
      color: #495057;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.05rem;
    }

    .checkbox-label i {
      color: #28a745;
    }

    .field-help {
      color: #6c757d;
      font-size: 0.9rem;
      font-style: italic;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.9rem;
      font-weight: 500;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
      padding-top: 1rem;
    }

    /* Input customizations */
    :host ::ng-deep {
      .p-inputtext:focus,
      .p-inputnumber-input:focus {
        border-color: #e91e63 !important;
        box-shadow: 0 0 0 0.2rem rgba(233, 30, 99, 0.25) !important;
      }

      .p-checkbox .p-checkbox-box.p-highlight {
        background-color: #e91e63 !important;
        border-color: #e91e63 !important;
      }

      .p-inputnumber-buttons-stacked .p-button {
        background: #e91e63 !important;
        border-color: #e91e63 !important;
      }
    }

    @media (max-width: 768px) {
      .form-header {
        flex-direction: column;
        align-items: stretch;
      }

      .form-title {
        font-size: 1.6rem;
        justify-content: center;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .form-actions p-button {
        width: 100%;
      }

      .checkbox-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class DoceFormComponent implements OnInit {
  doceForm: FormGroup;
  loading = false;
  isEditMode = false;
  doceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doceService: DoceService,
    private messageService: MessageService
  ) {
    this.doceForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      disponivel: [true]
    });
  }

  ngOnInit() {
    this.verificarModoEdicao();
  }

  verificarModoEdicao() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.router.url.includes('editar')) {
      this.isEditMode = true;
      this.doceId = +id;
      this.carregarDoce();
    }
  }

carregarDoce() {
  if (!this.doceId) return;

  this.loading = true;
  this.doceService.getDoceById(this.doceId).subscribe({
    next: (doce) => {
      if (!doce) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Doce não encontrado'
        });
        this.router.navigate(['/doces']);
        return;
      }

      this.doceForm.patchValue({
        nome: doce.nome,
        preco: doce.preco,
        disponivel: doce.disponivel
      });
      this.loading = false;
    },
    error: (err) => {
      console.error('Erro ao carregar doce:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao carregar o doce'
      });
      this.loading = false;
    }
  });
}


  onSubmit() {
    if (this.doceForm.valid) {
      this.loading = true;
      const doceData = this.doceForm.value;

      if (this.isEditMode && this.doceId) {
        this.atualizarDoce(doceData);
      } else {
        this.criarDoce(doceData);
      }
    } else {
      this.marcarCamposComoTocados();
    }
  }

  criarDoce(doceData: any) {
    this.doceService.addDoce(doceData).subscribe({
      next: (doce) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Doce "${doce.nome}" criado com sucesso`
        });
        setTimeout(() => {
          this.router.navigate(['/doces', doce.id]);
        }, 1500);
      },
      error: (error) => {
        console.error('Erro ao criar doce:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar doce'
        });
        this.loading = false;
      }
    });
  }

  atualizarDoce(doceData: any) {
    if (!this.doceId) return;

    this.doceService.updateDoce(this.doceId, doceData).subscribe({
      next: (doce) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Doce "${doce.nome}" atualizado com sucesso`
        });
        setTimeout(() => {
          this.router.navigate(['/doces', doce.id]);
        }, 1500);
      },
      error: (error) => {
        console.error('Erro ao atualizar doce:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar doce'
        });
        this.loading = false;
      }
    });
  }

  marcarCamposComoTocados() {
    Object.keys(this.doceForm.controls).forEach(key => {
      this.doceForm.get(key)?.markAsTouched();
    });
  }
}