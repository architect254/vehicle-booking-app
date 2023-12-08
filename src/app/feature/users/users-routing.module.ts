import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/auth.guard';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      {
        path: 'list',
        component: ListComponent,
        canActivate:[AuthGuard],
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
