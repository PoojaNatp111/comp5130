import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NgxStarsModule } from 'ngx-stars';
import { NgxStarRatingModule } from 'ngx-star-rating'; 
import { SearchComponent } from './search/search.component';
import {FormsModule } from '@angular/forms'
import { FoodpageComponent } from './foodpage/foodpage.component';
import { CartPageComponent } from './cart-page/cart-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'cart-page',component:CartPageComponent},
  { path: 'search/:searchItem', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'tag/:tag', component:HomeComponent } ,
  { path: 'food/:id', component:FoodpageComponent } 
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes), NgxStarsModule, FormsModule, ],
  exports: [RouterModule]
})
export class AppRoutingModule {}