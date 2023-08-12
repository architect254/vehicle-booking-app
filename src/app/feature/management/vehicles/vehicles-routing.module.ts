import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component';
import { VehiclesComponent } from './vehicles.component';

export const matatusComponents = [
  VehiclesComponent,
  ManageVehicleComponent,
  ManageVehiclesComponent,
];

const routes: Routes = [
  {
    path: `add`,
    component: ManageVehicleComponent,
    data: [{ title: `Add Vehicle Details` }],
  },
  {
    path: `list`,
    component: ManageVehiclesComponent,
    data: [{ title: `View All Vehicle Details` }],
  },
  {
    path: `:id`,
    children: [
      {
        path: `update`,
        component: ManageVehicleComponent,
        data: [{ title: `Update Vehicle Details` }],
      },
    ],
    data: [{ title: `Add Vehicle Details` }],
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
export class VehiclesRoutingModule {}
