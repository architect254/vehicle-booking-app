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
    let jwtToken = null;
    return this.authenticationService.currentToken$.pipe(
      switchMap((token) => {
        jwtToken = token;
        console.log(`intercepting`, jwtToken);
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (jwtToken && !this.whiteListedUrls.includes(request.url)) {
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
