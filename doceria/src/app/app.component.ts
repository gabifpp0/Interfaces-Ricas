import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToolbarModule,
    ButtonModule,
    MenubarModule
  ],
  template: `
    <div class="layout-wrapper">
      <!-- Header Navigation -->
      <p-toolbar class="main-toolbar">
        <div class="p-toolbar-group-start">
          <h2 class="app-title">
            <i class="pi pi-heart-fill"></i>
            Doceria Delícias
          </h2>
        </div>
        
        <div class="p-toolbar-group-end">
          <p-button 
            label="Meus Doces" 
            icon="pi pi-list"
            [routerLink]="['/doces']"
            routerLinkActive="p-button-outlined"
            [routerLinkActiveOptions]="{exact: false}"
            class="mr-2">
          </p-button>
          
          <p-button 
            label="Novo Doce" 
            icon="pi pi-plus"
            [routerLink]="['/doces/novo']"
            routerLinkActive="p-button-outlined"
            severity="success">
          </p-button>
        </div>
      </p-toolbar>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <p>&copy; 2024 Doceria Delícias - Sistema de Gestão de Doces Artesanais</p>
      </footer>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid #dee2e6;
    }

    .app-title {
      color: #e91e63;
      margin: 0;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      background: linear-gradient(135deg, #ffeef3 0%, #fff5f7 100%);
      min-height: calc(100vh - 140px);
    }

    .app-footer {
      background: linear-gradient(135deg, #e91e63, #d81b60);
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: auto;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
      
      .p-toolbar-group-end {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'doceria-angular-primeng';
}