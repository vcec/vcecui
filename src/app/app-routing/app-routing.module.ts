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
import {EditPortfolioComponent} from "../admin/portfolios/editPortfolio/editPortfolio.component";
import {CreateOrUpdatPortfolioComponent} from "../admin/portfolios/create-or-updat-portfolio/create-or-updat-portfolio.component";
import {CreateOrUpdateCategoryComponent} from "../admin/categories/create-or-update-category/create-or-update-category.component";
import {CreateOrUpdateGroupComponent} from "../admin/groups/create-or-update-group/create-or-update-group.component";
import {CreateOrUpdatTestimonialComponent} from "../admin/testimonials/create-or-updat-testimonial/create-or-updat-testimonial.component";
import {SubCategoryComponent} from "../admin/sub-category/sub-category.component";
import {CreateOrUpdateSubCatComponent} from "../admin/sub-category/create-or-update-sub-cat/create-or-update-sub-cat.component";

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
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'groups/create', component: CreateOrUpdateGroupComponent},
      {path: 'groups/update/:id', component: CreateOrUpdateGroupComponent},
      {path: 'groups', component: GroupsComponent},
      {path: 'categories/create', component: CreateOrUpdateCategoryComponent},
      {path: 'categories/update/:id', component: CreateOrUpdateCategoryComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'portfolios/create', component: CreateOrUpdatPortfolioComponent},
      {path: 'portfolios/update/:id', component: CreateOrUpdatPortfolioComponent},
      {path: 'portfolios', component: PortfoliosComponent},
      {path: 'testimonials/create', component: CreateOrUpdatTestimonialComponent},
      {path: 'testimonials/update/:id', component: CreateOrUpdatTestimonialComponent},
      {path: 'testimonials', component: TestimonialsComponent},
      {path: 'subCategory', component: SubCategoryComponent},
      {path: 'subCategory/create', component: CreateOrUpdateSubCatComponent},
      {path: 'subCategory/update/:id', component: CreateOrUpdateSubCatComponent},
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
