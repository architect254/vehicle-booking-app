import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { CompaniesComponent } from './companies.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';

export const matatusComponents = [
  CompaniesComponent,
  ManageCompaniesComponent,
  ManageCompanyComponent,
];

const routes: Routes = [
  {
    path: `add`,
    component: ManageCompanyComponent,
    data: { title: `Add Company` },
  },
  {
    path: `list`,
    component: ManageCompaniesComponent,
    data: { title: `View All Companies` },
  },
  {
    path: `:id`,
    children: [
      {
        path: `update`,
        component: ManageCompanyComponent,
        data: { title: `Update Company` },
      },
      {
        path: `view`,
        component: ViewCompanyComponent,
        data: { title: `View Company` },
      },
      {
        path: `vehicles/add`,
        component: ManageVehicleComponent,
        data: { title: `Add Company Vehicle` },
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
export class CompaniesRoutingModule {}
