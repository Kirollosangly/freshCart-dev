import { Component, OnInit } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishListService: WishListService, private _CartService: CartService, private _ToastrService: ToastrService) { }
  myWishList: any[] = [];
  wishlistempty: boolean = true;
  ngOnInit(): void {
    this.comGetWishlist();
  }

  comGetWishlist() {
    this._WishListService.getUserWishList().subscribe({
      next: (response) => {
        this.myWishList = response.data;
        if (response.count !== 0) {
          this.wishlistempty = false;
        } else {
          this.wishlistempty = true;
        }
      },
      error: () => { },
      complete: () => { }
    })
  }

  addPro(pro_Id: string) {
    this._CartService.addToCart(pro_Id).subscribe({
      next: () => { },
      error: () => { },
      complete: () => { }
    })
  }

  removeWishList(pro_Id: string) {
    this._WishListService.removeFromWishlist(pro_Id).subscribe({
      next: (response) => {
        if (response.data !== 0) {
          this.wishlistempty = false;
        } else {
          this.wishlistempty = true;
        }
      },
      error: () => { },
      complete: () => {
        this._ToastrService.success('Item removed from wishlist', 'Success')
        this.comGetWishlist();
      }
    })
  }
}
