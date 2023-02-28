import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';

@NgModule({
  exports:[
    ButtonModule,
    CardModule,
    MenubarModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
