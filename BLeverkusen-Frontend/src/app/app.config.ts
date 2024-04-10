import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
};
