import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _baseURL: string = 'https://ecommerce.routemisr.com/';
  constructor(private _HttpClient: HttpClient) { }

  getProducts(pNum: number = 1): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/products?page=${pNum}`);
  }

  getProductById(id:string): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/products/${id}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/categories`);
  }

  getAllBrand(pNum: number = 1): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}api/v1/brands?page=${pNum}`);
  }
}
