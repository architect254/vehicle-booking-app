import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, map, shareReplay, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menu = menu;

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

  ngOnInit(): void {
    this.isHandset$.subscribe((isHandset) => {
      this.isMobile = isHandset;
    });
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
    icon:`diversity_3`,
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
