import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  navProNums: number = 0;
  constructor(private _AuthService:AuthService, private _CartService:CartService, public _LoaderService:LoaderService) {
    _AuthService.userProfile.subscribe({
      next: ()=> {
        if (_AuthService.userProfile.getValue() !== null) {
          this.isLogin = true; 
        } else {
          this.isLogin = false;
        }
      }
    })
  }
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response)=> {
        this.navProNums = 0;
        for(let i = 0; i < response.data.products.length; i++) {
          this.navProNums += response.data.products[i].count
        }
        this._CartService.cartSerProNums.next(this.navProNums)
      },
      error: ()=>{},
      complete: ()=>{
      }
    })
    this._CartService.cartSerProNums.subscribe({
      next: ()=>{
        this.navProNums = this._CartService.cartSerProNums.getValue();        
      }
    })
  }

  logoutBridge() {
    this._AuthService.logout();
  }

  userCart() {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{},
      error: (err)=>{},
      complete: ()=>{}
    })
  }
}
