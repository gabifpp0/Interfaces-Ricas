import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes'; 
import { providePrimeNG } from 'primeng/config';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import Lara from '@primeng/themes/lara';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

     providePrimeNG({
      theme: {
        preset: Lara, // Changed to Lara theme as Vela is not available
        options: {
          darkModeSelector: '.app-dark'
        },
      },
    }),

    importProvidersFrom(
      CommonModule,
      FormsModule,
      TableModule,
      DialogModule,
      ButtonModule,
      InputTextModule,
      InputNumberModule,
      InputSwitchModule,
      
    )
  ]
};