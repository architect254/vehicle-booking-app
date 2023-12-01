import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { JwtPayload } from '../misc/models/jwt.payload';
import { AuthDto } from '../misc/models/auth.dto';
import { User } from '../misc/models/user.model';
import { STORAGE_KEYS } from '../misc/models/storage-keys.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | null = null;
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  );
  public token$: Observable<any> =
    this.tokenSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  public get user$(): Observable<any> {
    return this.token$.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwt_decode(token);
          this.user = payload.user
          return this.user;
        }
        return null;
      })
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(
      map((token) => {
        debugger
        const isAuthenticated = !this.jwtHelper.isTokenExpired(token);

        return isAuthenticated;
      })
    );
  }

  signUp(credentials: AuthDto) {
    return this._http.post<void>(
      `${environment.apiUrl}/auth/sign-up`,
      credentials,
    );
  }

  signIn({ phone_number, password }: AuthDto) {
    return this._http
      .post<any>(`${environment.apiUrl}/auth/sign-in`, {
        phone_number,
        password,
      })
      .pipe(
        tap({
          next: ({ token }) => {
            this.tokenSubject.next(token);
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
          },
        })
      );
  }

  signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.tokenSubject.next(null);
    this._router.navigate(['../sign-in'], { relativeTo: this._route });
  }

  resetPassword(payload:any){
    return this._http.post<any>(`${environment.apiUrl}/auth/reset-password`,payload);
  }
}
