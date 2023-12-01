import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly whiteListedUrls = [
    `sign-up`, `sign-in`
  ]
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    return this.authenticationService.token$.pipe(
      switchMap((token) => {
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (token && !this.whiteListedUrls.includes(request.url)) {
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
