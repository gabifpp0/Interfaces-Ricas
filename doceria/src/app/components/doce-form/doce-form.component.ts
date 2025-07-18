import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './doce-form.component.html',
  styleUrls: ['./doce-form.component.scss']
})
export class DoceFormComponent implements OnInit, OnChanges {
  @Input() doce: Doce | null = null;
  @Input() isVisible: boolean = false;
  @Output() salvar = new EventEmitter<Doce | Omit<Doce, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();

  doceForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.doceForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      disponivel: [true]
    });
  }

  ngOnInit(): void {
    if (this.doce) {
      this.isEditMode = true;
      this.doceForm.patchValue(this.doce);
    }
  }

  ngOnChanges(): void {
    if (this.doce) {
      this.isEditMode = true;
      this.doceForm.patchValue(this.doce);
    } else {
      this.isEditMode = false;
      this.doceForm.reset({
        nome: '',
        preco: 0,
        disponivel: true
      });
    }
  }

  onSubmit(): void {
    if (this.doceForm.valid) {
      const formValue = this.doceForm.value;
      
      if (this.isEditMode && this.doce) {
        const doceAtualizado: Doce = {
          ...this.doce,
          ...formValue
        };
        this.salvar.emit(doceAtualizado);
      } else {
        this.salvar.emit(formValue);
      }
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  getErrorMessage(field: string): string {
    const control = this.doceForm.get(field);
    if (control?.hasError('required')) {
      return `${field} é obrigatório`;
    }
    if (control?.hasError('minlength')) {
      return `${field} deve ter pelo menos 2 caracteres`;
    }
    if (control?.hasError('min')) {
      return `${field} deve ser maior que zero`;
    }
    return '';
  }
}