import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, concatMap, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRole } from '../misc/models/user-role.enum';
import { User } from '../misc/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkLogin(route.toString());
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkLogin(childRoute.toString());
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkLogin(route.toString());
  }

  checkLogin(url: string): Observable<boolean> | Observable<UrlTree> {
    if (this.authService.isAuthenticated() ) {
     return this.authService.user$.pipe(switchMap((user: User | null)=>{
        if (user?.role.match(UserRole.ADMIN)) {
          return of(true)
        }
        else  return of(false);
     }))
    }

    // Navigate to the login page with extras
    return of(this.router.createUrlTree(['/auth/sign-in']))
  }
}
