import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NgxStarsModule } from 'ngx-stars';
import {FormsModule } from '@angular/forms'
import { FoodpageComponent } from './foodpage/foodpage.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AdminmainpageComponent } from './adminmainpage/adminmainpage.component';
import { RemoveitemComponent } from './removeitem/removeitem.component';
import { OrderslistComponent } from './orderslist/orderslist.component';
import { MyorderComponent } from './myorder/myorder.component';


export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'cart-page',component:CartPageComponent},
  { path: 'search/:searchItem', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tag/:tag', component:HomeComponent } ,
  { path: 'food/:id', component:FoodpageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'forgot-password', component: ForgotPassComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'admin-dashboard', component: AdminComponent },
  { path: 'add-food', component: AddFoodComponent },
  { path: 'admin-main', component: AdminmainpageComponent },
  { path: '', redirectTo: 'checkout', pathMatch: 'full' },
  { path: 'delete-item', component: RemoveitemComponent }, 
  { path: 'orders', component: OrderslistComponent },
  { path: 'MyorderComponent', component: MyorderComponent },
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes), NgxStarsModule, FormsModule ],
  exports: [RouterModule]
})
export class AppRoutingModule {}