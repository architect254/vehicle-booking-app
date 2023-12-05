import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridModule } from './data-grid/data-grid.module';



@NgModule({
  declarations: [],
  providers:[],
  imports: [
    CommonModule,
    DataGridModule
  ],
  exports:[DataGridModule]
})
export class SharedModule { }
