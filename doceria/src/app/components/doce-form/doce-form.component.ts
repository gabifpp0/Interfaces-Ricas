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
import { bootstrapApplication } from '@angular/platform-browser';

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
  templateUrl: './doce-form.component.html',
  styleUrls: ['./doce-form.component.scss'],
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
    // Eu já havia implementado Reactive Forms
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

  criarDoce(doce: Doce) {
    this.doceService.criarDoce(doce).subscribe({
      next: (res) => {
        console.log('Doce criado:', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Doce "${res.nome}" criado com sucesso`
        });
        setTimeout(() => {
          this.router.navigate(['/doces', res.id]);
        }, 1500);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao criar doce:', err);
        
        let errorDetail = 'Erro desconhecido';
        if (err.status === 0) {
          errorDetail = 'Falha na conexão com o servidor';
        } else if (err.error?.message) {
          errorDetail = err.error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Falha ao criar doce: ${errorDetail}`
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