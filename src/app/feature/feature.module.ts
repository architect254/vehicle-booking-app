import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';
import { BookingComponent } from './booking-section/booking/booking.component';
import { BookingSectionComponent } from './booking-section/booking-section.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatCardModule,
];
@NgModule({
  declarations: [
    BookingComponent,
    BookingSectionComponent,
    LoginComponent,
    NotFoundComponent,
    DeleteConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    materialModules,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class FeatureModule {}
