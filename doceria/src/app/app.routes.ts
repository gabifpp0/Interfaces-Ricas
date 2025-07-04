import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocesComponent } from './doces/doces.component';

export const routes: Routes = [
  { path: '', redirectTo: 'doces', pathMatch: 'full' },
  { path: 'doces', component: DocesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }