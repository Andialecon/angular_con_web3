import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { MenuComponent } from './menu/menu.component';
import { AuthRoutingModule } from './auth/auth-routing.module';


@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AuthRoutingModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    PrimeNgModule,
    MenuComponent
  ]
})
export class SharedModule { }
