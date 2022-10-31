import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AngularPageComponent } from './components/angular-page/angular-page.component';
import { SharedModule } from './components/shared/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
