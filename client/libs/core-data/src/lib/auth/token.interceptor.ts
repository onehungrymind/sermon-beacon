import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    request = request.clone({
      setHeaders: authToken ? {
        Authorization: `Bearer ${authToken}`
      } : {
        'X-Hasura-Role': 'anonymous',
      }
    });

    return next.handle(request);
  }
}
