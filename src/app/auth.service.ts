import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import  jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private _HttpClient: HttpClient, private _Route: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.userData();
    }
  }

  _baseURL: string = 'https://ecommerce.routemisr.com/';
  userProfile = new BehaviorSubject(null);

  userData() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    this.userProfile.next(decoded);
  }
  register(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this._baseURL}api/v1/auth/signup`, data)
  }

  login(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this._baseURL}api/v1/auth/signin`, data)
  }

  logout() {
    localStorage.removeItem('userToken')
    this.userProfile.next(null)
    this._Route.navigate(['/login'])
  }


}
