import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { WishListService } from '../wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    
  products: Product[] = [];
  myWishList : any[] = [];
  searchTerm = "";
  innerProNums: number = 0;
  numberOfPages: number [] = [1,2];

  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _WishListService: WishListService,
              private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllPro()
  }

  getAllPro(pNumber: number = 1) {
    this._ProductsService.getProducts(pNumber).subscribe({
      next: (response) => { this.products = response.data;},
      error: ()=> {},
      complete: ()=>{
        // this._WishListService.getUserWishList().subscribe({
        //   next: (response) => {this.myWishList = response.data;},
        //   error: (err) => { },
        //   complete: () => {
        //     for (let i = 0; i < this.products.length; i++) {
        //       for(let y = 0; y < this.myWishList.length; y++) {
        //         if (this.products[i]._id == this.myWishList[y].id) {
        //           document.querySelectorAll('#favList')[i]?.classList.add('wishList')         
        //         }
        //       }
        //     }
        //   }
        // })
      }
    })
  }

  addPro(pro_Id: string) {
    this._CartService.addToCart(pro_Id).subscribe({
      next: (response) => {
        this.innerProNums = 0;
        for(let i = 0; i < response.data.products.length; i++) {
          this.innerProNums += response.data.products[i].count
        }
      },
      error: () => { },
      complete: () => { 
        this._ToastrService.success('Product added to cart','Success')
        this._CartService.cartSerProNums.next(this.innerProNums)
      }
    })
  }

  addWishList(pro_Id: string) {
    this._WishListService.addtoWishlist(pro_Id).subscribe({
      next: (response) => {},
      error: () => {},
      complete: () => {
        this._ToastrService.success('Item added to wishlist','Success')
        this._WishListService.getUserWishList().subscribe({
          next: (response) => {this.myWishList = response.data;},
          error: (err) => { },
          complete: () => {
            for (let i = 0; i < this.products.length; i++) {
              for(let y = 0; y < this.myWishList.length; y++) {
                if (this.products[i]._id == this.myWishList[y].id) {
                  document.querySelectorAll('#favList')[i]?.classList.add('wishList')         
                }
              }
            }
          }
        })
      }
    })
  }
}
