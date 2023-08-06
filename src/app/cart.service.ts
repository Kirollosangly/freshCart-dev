import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  authHeaders: any = { token: localStorage.getItem('userToken')};
  _baseURL: string = 'https://ecommerce.routemisr.com/';
  cartSerProNums = new BehaviorSubject(0);
  cartId: any;
  constructor(private _HttpClient: HttpClient) {
    this.getUserCart().subscribe({
      next: (response) => { this.cartId = response.data._id; },
      error: () => { },
      complete: () => { },
    })
  }

  addToCart(pro_id: string): Observable<any> {
    return this._HttpClient.post(`${this._baseURL}api/v1/cart`, { productId: pro_id, load: false })
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/cart`)
  }

  removeCartItem(pro_id: string): Observable<any> {
    return this._HttpClient.delete(`${this._baseURL}api/v1/cart/${pro_id}`)
  }

  updateItemCount(pro_id: string, iCount: number): Observable<any> {
    return this._HttpClient.put(`${this._baseURL}api/v1/cart/${pro_id}`, { count: iCount, load: false })
  }


  onlinePayment(cartId: string, data: FormGroup): Observable<any> {
    // return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=https://kirollosangly.github.io/freshCart`, { shippingAddress: data })
    return this._HttpClient.post(`${this._baseURL}api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, { shippingAddress: data })
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/orders/user/${userId}`)
  }
}
