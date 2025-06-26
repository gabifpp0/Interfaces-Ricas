import { Routes } from '@angular/router';

import { DoceListaComponent } from './components/doce-lista/doce-lista.component';
import { DoceFormComponent } from './components/doce-form/doce-form.component';
import { DoceDetalheComponent } from './components/doce-detalhe/doce-detalhe.component';

const routes: Routes = [
  { path: '', redirectTo: 'doces', pathMatch: 'full' },
  { path: 'doces', component: DoceListaComponent },
  { path: 'doces/novo', component: DoceFormComponent },
  { path: 'doces/:id', component: DoceDetalheComponent },
  { path: 'doces/:id/editar', component: DoceFormComponent },
];
