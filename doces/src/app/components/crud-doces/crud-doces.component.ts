import { Component, OnInit } from '@angular/core';
import { Doce } from '../../models/doce.model';
import { DoceService } from '../../services/doce.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crud-doces',
  templateUrl: './crud-doces.component.html',
  styleUrls: ['./crud-doces.component.scss']
})
export class CrudDocesComponent implements OnInit {
  doces: Doce[] = [];
  selectedDoce: Doce = this.emptyDoce();
  displayDialog = false;
  isNew = false;
  detailVisible = false;

  constructor(
    private doceService: DoceService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.doces = this.doceService.readAll();
  }

  showAddDialog() {
    this.isNew = true;
    this.selectedDoce = this.emptyDoce();
    this.displayDialog = true;
  }

  showEditDialog(doce: Doce) {
    this.isNew = false;
    this.selectedDoce = { ...doce };
    this.displayDialog = true;
  }

  showDetail(doce: Doce) {
    this.selectedDoce = { ...doce };
    this.detailVisible = true;
  }

  save() {
    if (this.isNew) {
      this.doceService.create(this.selectedDoce);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Doce adicionado!'
      });
    } else {
      this.doceService.update(this.selectedDoce.id, this.selectedDoce);
      this.messageService.add({
        severity: 'info',
        summary: 'Atualizado',
        detail: 'Doce atualizado!'
      });
    }

    this.doces = this.doceService.readAll();
    this.displayDialog = false;
  }

  deleteDoce(id: number) {
    if (this.doceService.delete(id)) {
      this.doces = this.doceService.readAll();
      this.messageService.add({
        severity: 'warn',
        summary: 'Removido',
        detail: 'Doce deletado!'
      });
    }
  }

  private emptyDoce(): Doce {
    return {
      id: 0,
      nome: '',
      preco: 0,
      disponivel: true
    };
  }
}