import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {OwlModule} from 'ngx-owl-carousel';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LandingComponent} from './components/landing/landing.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/dataService.service';

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
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
