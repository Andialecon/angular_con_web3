import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AngularPageComponent } from './components/angular-page/angular-page.component';
import { SharedModule } from '../app/components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AngularPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
