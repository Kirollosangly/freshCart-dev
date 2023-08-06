import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories: any[] = [];
  constructor(private _ProductsService:ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (response)=> {this.categories = response.data;}
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
        items: 6
      },
      400: {
        items: 6
      },
      740: {
        items: 6
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
