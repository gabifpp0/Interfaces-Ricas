import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
    MatToolbarModule,
    MatIconModule,
    DoceListComponent,
    DoceFormComponent,
    DoceDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Doceria Sweet Dreams';
  doces$: Observable<Doce[]>;
  
  // Estados para controlar a exibição dos componentes
  mostrarFormulario = false;
  mostrarDetalhes = false;
  
  // Doce selecionado para edição ou visualização
  doceSelecionado: Doce | null = null;

  constructor(private doceService: DoceService) {
    this.doces$ = this.doceService.getDoces();
  }

  ngOnInit(): void {}

  // Eventos do componente de lista
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
    if (confirm('Tem certeza que deseja excluir este doce?')) {
      this.doceService.deleteDoce(id);
    }
  }

  // Eventos do componente de formulário
  onSalvarDoce(doce: Doce | Omit<Doce, 'id'>): void {
    if ('id' in doce) {
      // Atualizar doce existente
      this.doceService.updateDoce(doce);
    } else {
      // Criar novo doce
      this.doceService.addDoce(doce);
    }
    this.fecharFormulario();
  }

  onCancelarFormulario(): void {
    this.fecharFormulario();
  }

  // Eventos do componente de detalhes
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