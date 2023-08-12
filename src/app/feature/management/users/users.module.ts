import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CompaniesService } from '../companies/companies.service';

const materialModules = [
  MatRippleModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRippleModule,
  MatCardModule,
];

@NgModule({
  declarations: [UsersComponent, ManageUserComponent, ManageUsersComponent],
  providers: [CompaniesService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules,
    HttpClientModule,
    UsersRoutingModule,
  ],
})
export class UsersModule {}
