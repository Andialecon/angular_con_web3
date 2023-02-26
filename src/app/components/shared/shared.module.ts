import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { MenuComponent } from './menu/menu.component';




@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    PrimeNgModule,
    MenuComponent
  ]
})
export class SharedModule { }
