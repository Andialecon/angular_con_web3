import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';




@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    PrimeNgModule
  ]
})
export class SharedModule { }
