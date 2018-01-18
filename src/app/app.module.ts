import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {OwlModule} from 'ngx-owl-carousel';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AnimateOnScrollModule} from 'ng2-animate-on-scroll';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';

import {LandingComponent} from './components/landing/landing.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/dataService.service';
import {Config} from './services/config.service';
import {AdminComponent} from './admin/admin.component';
import {GroupsComponent} from './admin/groups/groups.component';
import {CategoriesComponent} from './admin/categories/categories.component';
import {PortfoliosComponent} from './admin/portfolios/portfolios.component';
import {TestimonialsComponent} from './admin/testimonials/testimonials.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {ProfileComponent} from './components/profile/profile.component';
import {ConfirmComponent} from "./admin/confirmComponent/confirm.component";
import {CreateOrUpdateCategoryComponent} from './admin/categories/create-or-update-category/create-or-update-category.component';
import {CreateOrUpdateGroupComponent} from './admin/groups/create-or-update-group/create-or-update-group.component';
import {CreateOrUpdatTestimonialComponent} from './admin/testimonials/create-or-updat-testimonial/create-or-updat-testimonial.component';
import {CreateOrUpdatPortfolioComponent} from './admin/portfolios/create-or-updat-portfolio/create-or-updat-portfolio.component';
import {CategoryComponent} from './components/category/category.component';
import {SubCategoryComponent} from './admin/sub-category/sub-category.component';
import {CreateOrUpdateSubCatComponent} from './admin/sub-category/create-or-update-sub-cat/create-or-update-sub-cat.component';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LoginComponent} from './admin/login/login.component';
import {AuthGuardService} from './services/authGuardService';
import {CustomFormsModule} from 'ng2-validation'


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
    ProfileComponent,
    ConfirmComponent,
    CreateOrUpdateCategoryComponent,
    CreateOrUpdateGroupComponent,
    CreateOrUpdatTestimonialComponent,
    CreateOrUpdatPortfolioComponent,
    CategoryComponent,
    SubCategoryComponent,
    CreateOrUpdateSubCatComponent,
    LoginComponent
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
    AnimateOnScrollModule.forRoot(),
    ToastModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body}),
    CustomFormsModule
  ],
  providers: [HttpClientModule,
    CookieService,
    AuthGuardService,
    DataService, Config,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
