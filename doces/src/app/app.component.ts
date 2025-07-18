import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doce } from './models/doce.model';
import { DoceService } from './services/doce.service';
import { DoceFormComponent } from './/components/doce-form/doce-form.component';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  doces: Doce[] = [];
  displayedColumns: string[] = ['nome', 'preco', 'disponivel', 'acoes'];
  title = 'doces';

  constructor(
    private doceService: DoceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDoces();
  }

  loadDoces() {
    this.doces = this.doceService.readAll();
  }

  openForm(doce?: Doce) {
    const dialogRef = this.dialog.open(DoceFormComponent, {
      width: '400px',
      data: doce ? {...doce} : { nome: '', preco: 0, disponivel: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.doceService.update(result.id, result);
        } else {
          this.doceService.create(result);
        }
        this.loadDoces();
      }
    });
  }

  deleteDoce(id: number) {
    if (confirm('Tem certeza que deseja excluir este doce?')) {
      this.doceService.delete(id);
      this.loadDoces();
    }
  }
}