import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  {
    path: ``,
    component: ManagementComponent,
    children: [
      {
        path: `users`,
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: `companies`,
        loadChildren: () =>
          import('./companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        path: `vehicles`,
        loadChildren: () =>
          import('./vehicles/vehicles.module').then((m) => m.VehiclesModule),
      },
      {
        path: ``,
        redirectTo: `vehicles`,
        pathMatch: `full`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
