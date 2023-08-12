import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

import { SidenavService } from '../core/sidenav.service';
import { TitleService } from '../core/title.service';
import { User } from '../feature/management/users/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isMainPage: boolean = true;
  isLoggedIn: boolean = false;
  user: any = null;
  title: string = ``;

  constructor(
    private sideNavService: SidenavService,
    private router: Router,
    private titleService: TitleService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isMainPage = event.url == `/`;
      });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (this.isLoggedIn) {
        this.authService.currentTokenUserValue$.subscribe({
          next: (user: User) => {
            this.user = user;
          },
        });
      }
    });
  }

  ngAfterViewChecked(): void {
    this.titleService._title.asObservable().subscribe((title: string) => {
      this.title = title;
      this.cdr.detectChanges();
    });
  }

  toggleSideNav() {
    this.sideNavService.toggleSideNav();
  }

  logout() {
    this.authService.logout();
  }
}
