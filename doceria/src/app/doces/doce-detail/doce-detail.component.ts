// src/app/components/doce-detail/doce-detail.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Doce } from '../../models/doce.model';

@Component({
  selector: 'app-doce-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doce-detail.component.html',
  styleUrls: ['./doce-detail.component.scss']
})
export class DoceDetailComponent {
  @Input() doce: Doce | null = null;
}