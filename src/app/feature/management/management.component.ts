import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { SidenavService } from '../../core/sidenav.service';
import { TitleService } from '../../core/title.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  showFiller = false;

  openNavList: [boolean, boolean] = [true, false];

  @ViewChild(`drawer`) drawer!: MatDrawer;

  constructor(
    private sideNavService: SidenavService,
    private titleService: TitleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.title = `Management`;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (event: any) => {
          event.url.includes(`matatu`)
            ? (this.openNavList = [true, false])
            : event.url.includes(`users`)
            ? (this.openNavList = [false, true])
            : (this.openNavList = [false, false]);
        },
      });
    this.sideNavService.sideNavState$.subscribe(() => {
      this.drawer?.toggle();
    });
  }
}
