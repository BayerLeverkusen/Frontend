import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { iTInterceptor } from './interceptor/it.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: iTInterceptor,
      multi: true
    }
  ],
};
