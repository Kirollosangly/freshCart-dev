import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private _CartService:CartService,
              private _ToastrService:ToastrService) { }
  
  productId: string = '';
  productData: any;
  innerProNums: number = 0;

  ngOnInit(): void {
    // this._ActivatedRoute.paramMap.subscribe({
    //   next: (params)=> {
    //     console.log(params.get('id'));

    //   }
    // })
    this.productId = this._ActivatedRoute.snapshot.params['id'];

    this._ProductsService.getProductById(this.productId).subscribe({
      next: (response)=> {this.productData = response.data},
      error: ()=>{},
      complete: ()=>{}
    })
  }

  addProduct(proId: string) {
    this._CartService.addToCart(proId).subscribe({
      next: (response)=> {
        this.innerProNums = 0;
        for(let i = 0; i < response.data.products.length; i++) {
          this.innerProNums += response.data.products[i].count
        }
      },
      error: ()=>{},
      complete: ()=>{
        this._ToastrService.success('Product added to cart','Success');
        this._CartService.cartSerProNums.next(this.innerProNums)
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
