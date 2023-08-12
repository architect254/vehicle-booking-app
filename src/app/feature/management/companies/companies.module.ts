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
import { CompaniesComponent } from './companies.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { MatDividerModule } from '@angular/material/divider';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';

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
  MatDividerModule,
  NgxMaterialTimepickerModule,
];

@NgModule({
  declarations: [
    CompaniesComponent,
    ManageCompanyComponent,
    ManageCompaniesComponent,
    ViewCompanyComponent,
    ManageVehicleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules,
    CompaniesRoutingModule,
  ],
})
export class CompaniesModule {}
