import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';




@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
