import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Doce } from '../../models/doce.model';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-doce-form',
  standalone: true,
  templateUrl: './doce-form.component.html',
  styleUrls: ['./doce-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class DoceFormComponent {
  doce: Doce;
  

  constructor(
    public dialogRef: MatDialogRef<DoceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doce
  ) {
    this.doce = { ...data };
  }

  save() {
    this.dialogRef.close(this.doce);
  }
}
