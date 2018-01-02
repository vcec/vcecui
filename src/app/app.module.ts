import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {OwlModule} from 'ngx-owl-carousel';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AnimateOnScrollModule} from 'ng2-animate-on-scroll';

import {LandingComponent} from './components/landing/landing.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/dataService.service';
import {AdminComponent} from './admin/admin.component';
import {GroupsComponent} from './admin/groups/groups.component';
import {CategoriesComponent} from './admin/categories/categories.component';
import {PortfoliosComponent} from './admin/portfolios/portfolios.component';
import {TestimonialsComponent} from './admin/testimonials/testimonials.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { ProfileComponent } from './components/profile/profile.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'http://localhost:3001/uploadImage',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  addRemoveLinks: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomepageComponent,
    AdminComponent,
    GroupsComponent,
    CategoriesComponent,
    PortfoliosComponent,
    TestimonialsComponent,
    ProfileComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    OwlModule,
    Ng2PageScrollModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropzoneModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [HttpClientModule,
    DataService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
