// src/app/components/doce-container/doce-container.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoceListComponent } from '../doce-list/doce-list.component';
import { DoceCreateComponent } from '../doce-create/doce-create.component';
import { DoceUpdateComponent } from '../doce-update/doce-update.component';
import { DoceDetailComponent } from '../doce-detail/doce-detail.component';
import { DoceService } from '../../services/doce.service';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DoceListComponent,
    DoceCreateComponent,
    DoceUpdateComponent,
    DoceDetailComponent
  ],
  templateUrl: './doce-container.component.html',
  styleUrls: ['./doce-container.component.scss']
})
export class DoceContainerComponent implements OnInit {
  selectedDoce: Doce | null = null;
  showCreateForm = false;
  showUpdateForm = false;
  showDetail = false;

  constructor(private doceService: DoceService) {}

  ngOnInit(): void {}

  handleDoceCreated(doce: Doce): void {
    this.showCreateForm = false;
    this.selectedDoce = null;
  }

  handleEditDoce(doce: Doce): void {
    this.selectedDoce = { ...doce };
    this.showUpdateForm = true;
    this.showCreateForm = false;
    this.showDetail = false;
  }

  handleDoceUpdated(doce: Doce): void {
    this.showUpdateForm = false;
    this.selectedDoce = null;
  }

  handleDeleteDoce(id: number): void {
    if (confirm('Tem certeza que deseja excluir este doce?')) {
      this.doceService.remover(id).subscribe({
        next: () => {
          this.selectedDoce = null;
          this.showUpdateForm = false;
          this.showDetail = false;
        },
        error: (err) => console.error('Erro ao remover doce:', err)
      });
    }
  }

  handleViewDoce(doce: Doce): void {
    this.selectedDoce = { ...doce };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showUpdateForm = false;
  }

  handleCancel(): void {
    this.showUpdateForm = false;
    this.showCreateForm = false;
    this.showDetail = false;
    this.selectedDoce = null;
  }

  showCreate(): void {
    this.showCreateForm = true;
    this.showUpdateForm = false;
    this.showDetail = false;
    this.selectedDoce = null;
  }
}