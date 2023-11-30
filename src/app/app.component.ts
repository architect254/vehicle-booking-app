import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { User } from './misc/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoadingApp: boolean = false;
  user: User | null = null;
  private authSub!: Subscription;
  constructor(private authService: AuthService,private appService:AppService) {
    
  }
  ngOnInit(): void {
    this.isLoadingApp = true;
    this.appService.pingAPI().subscribe(resp=>{
      this.isLoadingApp = false;
    })
    setTimeout(()=>{
      this.authSub = this.authService.user$.subscribe((user: User) => {
        this.user = user;
      });
    })
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }
}
