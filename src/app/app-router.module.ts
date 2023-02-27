import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./components/shared/shared.module').then( m => m.SharedModule )
  },
  {
    path: '',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterModule { }
