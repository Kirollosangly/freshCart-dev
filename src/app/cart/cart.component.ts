import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = null;
  isZero: boolean = true;
  itemCounter: any;
  innerProNums: number = 0;

  constructor(private _CartService: CartService, private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => { this.cartItems = response.data;},
      error: (err) => { },
      complete: () => { 
        if(this._CartService.cartSerProNums.getValue() !== 0){
          this.isZero = false;
          console.log(`get: ${this.isZero}`);
        } else {
          this.isZero = true;
        }
      },
    })
  }

    removeItem(product_id: string) {
    this._CartService.removeCartItem(product_id).subscribe({
      next: (response) => { this.cartItems = response.data;
        this.innerProNums = 0;
        for (let i = 0; i < response.data.products.length; i++) {
          this.innerProNums += response.data.products[i].count
        }
    },
      error: (err) => { },
      complete: () =>{this._CartService.cartSerProNums.next(this.innerProNums) 
        this._ToastrService.success('Product removed from wishlist','Success');
        if(this._CartService.cartSerProNums.getValue() !== 0){
          this.isZero = false;          
        } else {
          this.isZero = true;
        }
      },
    })
  }

  updateItems(product_id: string, iCount: number) {
    this._CartService.updateItemCount(product_id, iCount).subscribe({
      next: (response) => { this.cartItems = response.data;
        this.innerProNums = 0;
        for (let i = 0; i < response.data.products.length; i++) {
          this.innerProNums += response.data.products[i].count
        }
    },
      error: (err) => { },
      complete: () => { 
        this._CartService.cartSerProNums.next(this.innerProNums)},
    })
  }
}
