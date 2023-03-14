import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { GameRoutingModule } from '../game-home/game-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    GameRoutingModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    PrimeNgModule,
    DashboardComponent
  ]
})
export class SharedModule { }
