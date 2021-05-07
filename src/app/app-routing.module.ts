import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './Services/Auth.guards'
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component:AccueilComponent
  },
  
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'register',
    pathMatch:'full',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
