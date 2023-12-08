import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridModule } from './data-grid/data-grid.module';
import { ViewableViewComponent } from './viewable-view/viewable-view.component';
import { BaseViewDirective } from './base-view.directive';



@NgModule({
  declarations: [
    ViewableViewComponent,
    BaseViewDirective
  ],
  providers:[],
  imports: [
    CommonModule,
    DataGridModule
  ],
  exports:[DataGridModule]
})
export class SharedModule { }
