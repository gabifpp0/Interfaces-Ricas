import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-doces',
  standalone: true,
  imports: [

    CommonModule,
    FormsModule,
    CurrencyPipe,
    

    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule
  ],
  templateUrl: './doces.component.html',
  styleUrls: ['./doces.component.scss']
})
export class DocesComponent {
  doces = [
    { id: 1, nome: 'Brigadeiro', preco: 2.50, disponivel: true },
    { id: 2, nome: 'Beijinho', preco: 2.00, disponivel: false },
    { id: 3, nome: 'Cajuzinho', preco: 3.00, disponivel: true }
  ];

  doceDialog = false;
  isEdit = false;
  doce: any = {};

  newDoce() {
    this.doce = {};
    this.isEdit = false;
    this.doceDialog = true;
  }

  editDoce(doce: any) {
    this.doce = { ...doce };
    this.isEdit = true;
    this.doceDialog = true;
  }


  saveDoce() {
    if (this.isEdit) {
   
      const index = this.doces.findIndex(d => d.id === this.doce.id);
      if (index !== -1) {
        this.doces[index] = this.doce;
      }
    } else {
   
      this.doce.id = this.createId();
      this.doces.push(this.doce);
    }
    
    this.doceDialog = false;
    this.doce = {};
  }

  deleteDoce(doce: any) {
    this.doces = this.doces.filter(d => d.id !== doce.id);
  }

  private createId(): number {
    return Math.max(...this.doces.map(d => d.id), 0) + 1;
  }
}