import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/shared/auth/auth.guard';

const routes: Routes = [
  {
    path:'game',
    loadChildren:() => import('./components/shared/shared.module').then( m => m.SharedModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: 'login'
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
