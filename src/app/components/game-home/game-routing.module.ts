import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './game-home.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component:GameHomeComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'mygames',
        component:MyGamesComponent
      },
      {
        path:'**',
        redirectTo:'home'
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
export class GameRoutingModule { }
