import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './../components/landing/landing.component';
import {HomepageComponent} from './../components/homepage/homepage.component';
import {ProfileComponent} from './../components/profile/profile.component';
import {AdminComponent} from '../admin/admin.component';
import {GroupsComponent} from '../admin/groups/groups.component';
import {PortfoliosComponent} from '../admin/portfolios/portfolios.component';
import {CategoriesComponent} from '../admin/categories/categories.component';
import {TestimonialsComponent} from '../admin/testimonials/testimonials.component';
import {EditPortfolioComponent} from "../admin/portfolios/editPortfolio/editPortfolio.component";


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'groups', component: GroupsComponent},
      {path: 'categories', component: CategoriesComponent},
      {
        path: 'portfolios/:id/edit',
        component: EditPortfolioComponent
      },
      {path: 'portfolios', component: PortfoliosComponent},
      {path: 'testimonials', component: TestimonialsComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
