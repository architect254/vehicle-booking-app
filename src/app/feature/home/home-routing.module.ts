import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {path: ``, component: HomeComponent, canActivate:[AuthGuard], children:[
    {path:'users', loadChildren:()=> import('../users/users.module').then(m => m.UsersModule), canLoad:[AuthGuard]},
    {path: ``, redirectTo:`/users`, pathMatch:`full`}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
