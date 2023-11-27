import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookingGridComponent } from './booking-grid/booking-grid.component';
import { BookingQueryComponent } from './booking-query/booking-query.component';
import { EntityDashboardComponent } from './entity-dashboard/entity-dashboard.component';



@NgModule({
  declarations: [
    BookingGridComponent,
    BookingQueryComponent,
    EntityDashboardComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule
  ]
})
export class BookingModule { }
