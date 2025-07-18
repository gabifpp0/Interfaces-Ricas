// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DoceContainerComponent } from './doces/doce-container/doce-container.component';

export const routes: Routes = [
  { path: '', redirectTo: '/doces', pathMatch: 'full' },
  { path: 'doces', component: DoceContainerComponent }
];