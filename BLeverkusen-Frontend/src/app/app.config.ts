import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideClientHydration(),
    provideHttpClient(),
    JwtHelperService
  ]
};



import { provideClientHydration } from '@angular/platform-browser';



