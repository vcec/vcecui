import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './../components/landing/landing.component';
import { HomepageComponent } from './../components/homepage/homepage.component'

 const routes: Routes = [
        {
            path: '',
            component: LandingComponent,
        },
        {
            path: 'home',
            component: HomepageComponent,
        }
    ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
  	RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
