import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { AuthComponent } from './components/shared/auth/auth.component';
import { AngularPageComponent } from './components/angular-page/angular-page.component';
import { SharedModule } from '../app/components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AngularPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
