import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component';

const materialModules = [
  MatRippleModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRippleModule,
  MatCardModule,
  NgxMaterialTimepickerModule,
];

@NgModule({
  declarations: [
    VehiclesComponent,
    ManageVehicleComponent,
    ManageVehiclesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules,
    VehiclesRoutingModule,
  ],
})
export class VehiclesModule {}
