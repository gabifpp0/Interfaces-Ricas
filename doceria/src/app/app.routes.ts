import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/doces',
    pathMatch: 'full'
  },
  {
    path: 'doces',
    loadComponent: () => import('./components/doce-list/doce-list.component').then(m => m.DoceListComponent),
    title: 'Lista de Doces'
  },
  {
    path: 'doces/novo',
    loadComponent: () => import('./components/doce-form/doce-form.component').then(m => m.DoceFormComponent),
    title: 'Novo Doce'
  },
  {
    path: 'doces/:id',
    loadComponent: () => import('./components/doce-detail/doce-detail.component').then(m => m.DoceDetailComponent),
    title: 'Detalhes do Doce'
  },
  {
    path: 'doces/:id/editar',
    loadComponent: () => import('./components/doce-form/doce-form.component').then(m => m.DoceFormComponent),
    title: 'Editar Doce'
  },
  
];