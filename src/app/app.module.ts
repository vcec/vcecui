import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { OwlModule } from 'ngx-owl-carousel';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LandingComponent} from './components/landing/landing.component';
import { HomepageComponent } from './components/homepage/homepage.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomepageComponent
  ],
  imports: [
  	NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    OwlModule,
    Ng2PageScrollModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
