import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoceWrapperComponent } from './doces/doce-wrapper/doce-wrapper.component';
import { DoceListaComponent } from './doces/doce-lista/doce-lista.component';
import { DoceFormComponent } from './doces/doce-form/doce-form.component';
import { DoceDetalheComponent } from './doces/doce-detalhe/doce-detalhe.component';


export const routes: Routes = [
  {
    path: '',
    component: DoceWrapperComponent,
    children: [
      { path: '', redirectTo: 'doces', pathMatch: 'full' },
      { path: 'doces', component: DoceListaComponent },
      { path: 'doces/novo', component: DoceFormComponent },
      { path: 'doces/:id/editar', component: DoceFormComponent },
      { path: 'doces/:id/detalhe', component: DoceDetalheComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }