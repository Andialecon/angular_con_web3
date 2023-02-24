import { PrimeNgModule } from '../components/shared/prime-ng/prime-ng.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  exports:[
    MenuComponent
  ],
  imports: [
    CommonModule, 
    PrimeNgModule
  ]
})
export class SharedModule { }
