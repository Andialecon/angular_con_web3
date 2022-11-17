import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { Navbar2Component } from './navbar2/navbar2.component';




@NgModule({
  declarations: [
    NavbarComponent,
    AuthComponent,
    Navbar2Component
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    Navbar2Component
  ]
})
export class SharedModule { }
