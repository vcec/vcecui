import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './../components/landing/landing.component';
import {HomepageComponent} from './../components/homepage/homepage.component';
import {ProfileComponent} from './../components/profile/profile.component';
import {CategoryComponent} from './../components/category/category.component';
import {AdminComponent} from '../admin/admin.component';
import {GroupsComponent} from '../admin/groups/groups.component';
import {PortfoliosComponent} from '../admin/portfolios/portfolios.component';
import {CategoriesComponent} from '../admin/categories/categories.component';
import {TestimonialsComponent} from '../admin/testimonials/testimonials.component';
import {CreateOrUpdatPortfolioComponent} from '../admin/portfolios/create-or-updat-portfolio/create-or-updat-portfolio.component';
import {CreateOrUpdateCategoryComponent} from '../admin/categories/create-or-update-category/create-or-update-category.component';
import {CreateOrUpdateGroupComponent} from '../admin/groups/create-or-update-group/create-or-update-group.component';
import {CreateOrUpdatTestimonialComponent} from '../admin/testimonials/create-or-updat-testimonial/create-or-updat-testimonial.component';
import {SubCategoryComponent} from '../admin/sub-category/sub-category.component';
import {CreateOrUpdateSubCatComponent} from '../admin/sub-category/create-or-update-sub-cat/create-or-update-sub-cat.component';
import {LoginComponent} from '../admin/login/login.component';
import {AuthGuardService} from '../services/authGuardService';

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
    path: 'profile/:productId',
    component: ProfileComponent,
  },
  {
    path: 'category/group/:groupName',
    component: CategoryComponent,
  },
  {
    path: 'category/category/:groupName',
    component: CategoryComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'groups/create', component: CreateOrUpdateGroupComponent, canActivate: [AuthGuardService]},
      {path: 'groups/update/:id', component: CreateOrUpdateGroupComponent, canActivate: [AuthGuardService]},
      {path: 'groups', component: GroupsComponent, canActivate: [AuthGuardService]},
      {path: 'groups/:page', component: GroupsComponent, canActivate: [AuthGuardService]},
      {path: 'categories/create', component: CreateOrUpdateCategoryComponent, canActivate: [AuthGuardService]},
      {path: 'categories/update/:id', component: CreateOrUpdateCategoryComponent, canActivate: [AuthGuardService]},
      {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
      {path: 'categories/:page', component: CategoriesComponent, canActivate: [AuthGuardService]},
      {path: 'portfolios/create', component: CreateOrUpdatPortfolioComponent, canActivate: [AuthGuardService]},
      {path: 'portfolios/update/:id', component: CreateOrUpdatPortfolioComponent, canActivate: [AuthGuardService]},
      {path: 'portfolios', component: PortfoliosComponent, canActivate: [AuthGuardService]},
      {path: 'portfolios/:page', component: PortfoliosComponent, canActivate: [AuthGuardService]},
      {path: 'testimonials/create', component: CreateOrUpdatTestimonialComponent, canActivate: [AuthGuardService]},
      {path: 'testimonials/update/:id', component: CreateOrUpdatTestimonialComponent, canActivate: [AuthGuardService]},
      {path: 'testimonials', component: TestimonialsComponent, canActivate: [AuthGuardService]},
      {path: 'testimonials/:page', component: TestimonialsComponent, canActivate: [AuthGuardService]},
      {path: 'subCategory', component: SubCategoryComponent, canActivate: [AuthGuardService]},
      {path: 'subCategory/create', component: CreateOrUpdateSubCatComponent, canActivate: [AuthGuardService]},
      {path: 'subCategory/update/:id', component: CreateOrUpdateSubCatComponent, canActivate: [AuthGuardService]},
      {path: 'subCategory/:page', component: SubCategoryComponent, canActivate: [AuthGuardService]}
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
