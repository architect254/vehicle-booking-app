import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { AdminGuard } from 'src/app/core/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      {
        path: `admin`,
        component: AdminComponent,
        canActivate:[AdminGuard]
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
