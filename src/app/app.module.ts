import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SharedModule } from '../app/components/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { AppRouterModule } from './app-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
