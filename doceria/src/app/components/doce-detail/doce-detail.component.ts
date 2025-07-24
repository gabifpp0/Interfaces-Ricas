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
  templateUrl: './doce-detail.component.html',
  styleUrls: ['./doce-detail.component.scss'],

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