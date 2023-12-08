import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule, MatPaginatorModule, DatePipe, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, DatePipe   ],
  exports:[GridComponent]
})
export class DataGridModule { }
