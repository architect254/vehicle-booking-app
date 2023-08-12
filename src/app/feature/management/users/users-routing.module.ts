import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersComponent } from './users.component';

export const matatusComponents = [
  UsersComponent,
  ManageUserComponent,
  ManageUsersComponent,
];

const routes: Routes = [
  {
    path: `add`,
    component: ManageUserComponent,
    data: { title: `Add New User` },
  },
  {
    path: `list`,
    component: ManageUsersComponent,
    data: { title: `View All Users` },
  },
  {
    path: `:id`,
    children: [
      {
        path: `update`,
        component: ManageUserComponent,
        data: { title: `Update User` },
      },
    ],
  },
  {
    path: ``,
    redirectTo: `list`,
    pathMatch: `full`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
