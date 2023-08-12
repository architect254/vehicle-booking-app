import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingSectionComponent } from './feature/booking-section/booking-section.component';
import { LoginComponent } from './feature/login/login.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: `sign-in`,
    component: LoginComponent,
    data: { heading: `Sign In` },
  },
  {
    path: ``,
    component: LayoutComponent,
    children: [
      {
        path: `manage`,
        loadChildren: () =>
          import('./feature/management/management.module').then(
            (m) => m.ManagementModule
          ),
        data: { heading: `Manage` },
      },
      { path: ``, component: BookingSectionComponent },
    ],
  },
  { path: `**`, component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
