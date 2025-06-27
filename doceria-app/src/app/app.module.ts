import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Added
import { HttpClientModule } from '@angular/common/http'; // Added
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DocesComponent } from './doces/doces.component';
import { AppRoutingModule } from './app-routing.module'; // Importa o módulo de roteamento

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    DocesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule, 
    CommonModule,
    FormsModule,
    
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
  
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }