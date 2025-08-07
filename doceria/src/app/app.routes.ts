import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.LoginComponent),
    pathMatch: 'full',
    title: 'Lista de Doces'
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'doces',
    loadComponent: () => import('./components/doce-list/doce-list.component').then(m => m.DoceListComponent),
    canActivate: [AuthGuard],
    title: 'Lista de Doces'
  },
  {
    path: 'doces/novo',
    loadComponent: () => import('./components/doce-form/doce-form.component').then(m => m.DoceFormComponent),
    canActivate: [AuthGuard],
    title: 'Novo Doce'
  },
  {
    path: 'doces/:id',
    loadComponent: () => import('./components/doce-detail/doce-detail.component').then(m => m.DoceDetailComponent),
    canActivate: [AuthGuard],
    title: 'Detalhes do Doce'
  },
  {
    path: 'doces/:id/editar',
    loadComponent: () => import('./components/doce-form/doce-form.component').then(m => m.DoceFormComponent),
    canActivate: [AuthGuard],
    title: 'Editar Doce'
  },
  
];