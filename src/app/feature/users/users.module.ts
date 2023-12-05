import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonToggleModule,
    SharedModule
  ]
})
export class UsersModule { }
