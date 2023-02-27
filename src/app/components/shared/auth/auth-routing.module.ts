import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from '../../game-home/game-home.component';
import { LoginComponent } from '../../login/login.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'home',
        component: GameHomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'**',
        redirectTo:'login'
      }

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }