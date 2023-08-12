import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';

import { AuthService } from './auth.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    let token = null;
    return this.authenticationService.currentToken$.pipe(
      switchMap((token) => {
        token = token;
        console.log(`intercepting`, token);
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (token && isApiUrl) {
          console.log(`intercepting`, token, isApiUrl);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}
