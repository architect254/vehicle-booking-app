import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  drawerOpen = true;
  private _toggleSideNav = new BehaviorSubject(this.drawerOpen);
  toggleSideNav() {
    console.log(`toggling`, this.drawerOpen);

    this.drawerOpen = !this.drawerOpen;
    this._toggleSideNav.next(this.drawerOpen);
  }

  get sideNavState$() {
    return this._toggleSideNav.asObservable();
  }

  constructor() {}
}
