import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', canActivate:[AuthGuard], component: HomeComponent, title:'Fresh Cart | Home'},
  {path: 'products', canActivate:[AuthGuard], component: ProductsComponent, title:'Fresh Cart | Products'},
  {path: 'productDetails/:id', canActivate:[AuthGuard], component: ProductDetailsComponent, title:'Fresh Cart | Product Details'},
  {path: 'categories', canActivate:[AuthGuard], component: CategoriesComponent, title:'Fresh Cart | Categories'},
  {path: 'cart', canActivate:[AuthGuard], component: CartComponent, title:'Fresh Cart | Cart'},
  {path: 'checkout/:id', canActivate:[AuthGuard], component: CheckoutComponent, title:'Fresh Cart | Check Out'},
  {path: 'allorders', canActivate:[AuthGuard], component: AllordersComponent, title:'Fresh Cart | All Orders'},
  {path: 'wishlist', canActivate:[AuthGuard], component: WishlistComponent, title:'Fresh Cart | Wishlist'},
  {path: 'brands', canActivate:[AuthGuard], component: BrandsComponent, title:'Fresh Cart | Brands'},
  {path: 'login', component: LoginComponent, title:'Fresh Cart | Login'},
  {path: 'register', component: RegisterComponent, title:'Fresh Cart | Register'},
  {path: 'settings', canActivate:[AuthGuard],loadChildren: ()=>import('./settings/settings.module').then((m)=>m.SettingsModule)},
  {path: '**', component: NotfoundComponent, title:'Not Found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
