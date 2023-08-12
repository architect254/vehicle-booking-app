import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LayoutComponent } from './layout/layout.component';

const materialModules = [
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    materialModules,
    FeatureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
