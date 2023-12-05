import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, Inject, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, last, map, shareReplay, startWith } from 'rxjs';
import {
  MatDialog,

} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/misc/models/user.model';
import { PasswordResetDialogComponent } from './password-reset-dialog/password-reset-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: 'WINDOW',  useValue: window }
  ],
})
export class HomeComponent implements OnInit {
  menu = menu;
  user$!: Observable<User>;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);

  panelOpenState = false;
  isMobile = false;
  isCollapsed = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private dialog: MatDialog, private authService: AuthService, @Inject('WINDOW') private window: Window  ) {}
  ngOnInit(): void {
    this.isHandset$.subscribe((isHandset) => {
      this.isMobile = isHandset;
    });

    this.user$ = this.authService.user$;
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  resetPassword() {
    const dialogRef = this.dialog.open(PasswordResetDialogComponent, {
      data: this.user$
    });

    dialogRef.afterClosed().subscribe((payload: {password:string, newPassword:string}) => {
      this.authService.resetPassword(payload).subscribe(()=>{
      });
    });
  }

  logOut(){
    this.authService.signOut();
    this.window.location.reload()
  }
}

interface MenuItem {
  name: string;
  path: string;
  order: number;
  icon: string;
  isActive: boolean;
}
const menu: MenuItem[] = [
  {
    name: `users`,
    path: `users`,
    order: 1,
    icon: `group`,
    isActive: false,
  },
  {
    name: `companies`,
    path: `companies`,
    order: 2,
    icon: `diversity_3`,
    isActive: false,
  },
  {
    name: `vehicles`,
    path: `vehicles`,
    order: 3,
    icon: `airport_shuttle`,
    isActive: false,
  },
  {
    name: `bookings`,
    path: `bookings`,
    order: 5,
    icon: `hotel_class`,
    isActive: false,
  },
  {
    name: `destinations`,
    path: `destinations`,
    order: 4,
    icon: `map`,
    isActive: false,
  },
];
