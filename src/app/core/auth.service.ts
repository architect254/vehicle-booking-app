import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { JwtPayload } from '../misc/models/jwt.payload';
import { AuthhDto } from '../misc/models/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem(`accessToken`)
  );
  public currentToken$: Observable<any> =
    this.currentTokenSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  public get currentTokenUserValue$(): Observable<any> {
    return this.currentToken$.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwt_decode(token);
          return payload.user;
        }
        return null;
      })
    );
  }

  signUp(credentials: AuthhDto) {
    return this._http.post<unknown>(
      `${environment.apiUrl}/sign-up`,
      credentials,
      { observe: 'response' }
    );
  }

  signIn({ username, pin }: AuthhDto) {
    return this._http
      .post<any>(`${environment.apiUrl}/sign-in`, {
        username,
        pin,
      })
      .pipe(
        tap({
          next: ({ accessToken }) => {
            this.currentTokenSubject.next(accessToken);
            localStorage.setItem('accessToken', accessToken);
          },
        })
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.currentToken$.pipe(
      map((token) => {
        const isAuthenticated = !this.jwtHelper.isTokenExpired(token);
        console.log(`isAuth`, isAuthenticated);

        return isAuthenticated;
      })
    );
  }

  signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    this.currentTokenSubject.next(null);
    this._router.navigate(['../sign-in'], { relativeTo: this._route });
  }
}
