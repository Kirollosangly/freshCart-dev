import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SeeMorePipe } from './see-more.pipe';
import { SearchPipe } from './search.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { AddHeadersInterceptor } from './add-headers.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundComponent,
    RegisterComponent,
    ProductsComponent,
    MainSliderComponent,
    ProductDetailsComponent,
    SeeMorePipe,
    SearchPipe,
    WishlistComponent,
    CheckoutComponent,
    AllordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatProgressBarModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeadersInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
