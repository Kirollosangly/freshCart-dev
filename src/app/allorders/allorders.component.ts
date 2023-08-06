import { BehaviorSubject } from 'rxjs';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  myOrders : any [] = [];  
  noorder: boolean = false;
  constructor(private _CartService:CartService) {}
  
  ngOnInit(): void {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    
    
    this._CartService.getUserOrders(decoded.id).subscribe({
      next:(response)=>{
        this.myOrders = [];
        this.myOrders = response; 
        if(response.length !== 0) {
          this.noorder == true; 
        } else {
          this.noorder == false;
        }},
      error:()=>{},
      complete:()=>{},
    })
  }
  



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
