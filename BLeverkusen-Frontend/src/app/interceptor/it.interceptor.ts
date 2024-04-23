import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class iTInterceptor implements HttpInterceptor {
    constructor() { }
    
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const authToken = localStorage.getItem('token');
      if(authToken && !request.url.includes('/api/auth')){
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        return next.handle(authReq);
      }
      return next.handle(request);
    }
}