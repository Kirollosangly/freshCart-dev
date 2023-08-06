import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.cartId = this._ActivatedRoute.snapshot.params['id']
  }

  cartId: string = ''
  paymentRes: any;
  shippingAddress = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })

  checkout(data: FormGroup) {
    this._CartService.onlinePayment(this.cartId, data.value).subscribe({
      next: (response) => {
        this.paymentRes = response },
      error: () => { },
      complete: () => { 
        window.location.href = this.paymentRes.session.url
      }
    })
  }
}

