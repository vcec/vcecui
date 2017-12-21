import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LandingComponent} from './components/landing/landing.component';
import { NewcompComponent } from './newcomp/newcomp.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NewcompComponent
  ],
  imports: [
  	NgbModule.forRoot(),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
