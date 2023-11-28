import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path:'auth', loadChildren:()=> import('./feature/auth/auth.module').then(m => m.AuthModule)},
  {path:'', loadChildren:()=> import('./feature/home/home.module').then(m => m.HomeModule), canLoad: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
