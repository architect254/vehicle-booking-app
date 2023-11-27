import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { User } from './misc/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub!: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authSub = this.authService.currentTokenUserValue$.subscribe((user: User) => {
      this.authService.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }
}
