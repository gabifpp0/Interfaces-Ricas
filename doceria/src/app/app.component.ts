import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Doce } from './models/doce.model';
import { DoceService } from './services/doce.service';
import { DoceListComponent } from './components/doce-list/doce-list.component';
import { DoceFormComponent } from './components/doce-form/doce-form.component';
import { DoceDetailComponent } from './components/doce-detail/doce-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DoceListComponent,
    DoceFormComponent,
    DoceDetailComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Doceria Sweet Dreams';
  doces$: Observable<Doce[]>;
  
  mostrarFormulario = false;
  mostrarDetalhes = false;
  
  doceSelecionado: Doce | null = null;

  constructor(
    private doceService: DoceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.doces$ = this.doceService.getDoces();
  }

  ngOnInit(): void {}

  onNovoDoce(): void {
    this.doceSelecionado = null;
    this.mostrarFormulario = true;
    this.mostrarDetalhes = false;
  }

  onEditarDoce(doce: Doce): void {
    this.doceSelecionado = doce;
    this.mostrarFormulario = true;
    this.mostrarDetalhes = false;
  }

  onVisualizarDoce(doce: Doce): void {
    this.doceSelecionado = doce;
    this.mostrarDetalhes = true;
    this.mostrarFormulario = false;
  }

  onExcluirDoce(id: number): void {
    const doce = this.doceService.getDoceById(id);
    
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o doce "${doce?.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.doceService.deleteDoce(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Doce excluído com sucesso!'
        });
      }
    });
  }

  onSalvarDoce(doce: Doce | Omit<Doce, 'id'>): void {
    if ('id' in doce) {
      this.doceService.updateDoce(doce);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Doce atualizado com sucesso!'
      });
    } else {
      this.doceService.addDoce(doce);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Doce criado com sucesso!'
      });
    }
    this.fecharFormulario();
  }

  onCancelarFormulario(): void {
    this.fecharFormulario();
  }

  onFecharDetalhes(): void {
    this.mostrarDetalhes = false;
    this.doceSelecionado = null;
  }

  onEditarDoceDetalhes(doce: Doce): void {
    this.doceSelecionado = doce;
    this.mostrarDetalhes = false;
    this.mostrarFormulario = true;
  }

  private fecharFormulario(): void {
    this.mostrarFormulario = false;
    this.doceSelecionado = null;
  }
}