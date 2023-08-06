import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: any [] = [];
  numberOfPages: number [] = [1,2];

  constructor(private _ProductsService:ProductsService){ }


  ngOnInit(): void {
    this.getBrand()
  }


  getBrand(pNumber: number = 1) {
    this._ProductsService.getAllBrand(pNumber).subscribe({
      next: (response) => { this.brands = response.data},
      error: ()=> {},
      complete: ()=>{}
    })
  }



}
