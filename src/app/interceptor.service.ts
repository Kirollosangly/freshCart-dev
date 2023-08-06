import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, skip } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  _baseURL: string = 'https://route-ecommerce-app.vercel.app/';
  _URLs: any[] = [
    `${this._baseURL}api/v1/auth/signin`,
    `${this._baseURL}api/v1/auth/signup`,
    false
  ]
  constructor(public _LoaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body == null) {
      // console.log(req.body);
      if (this._URLs.includes(req.url)) {
        return next.handle(req)
      } else {
        this._LoaderService.isLoading.next(true);
        return next.handle(req).pipe(finalize(
          () => {
            setTimeout(() => {
              this._LoaderService.isLoading.next(false)
            }, 2000);
          }
        ))
      }
    } else {
      // console.log(req.body.load);
      if (this._URLs.includes(req.url) || this._URLs.includes(req.body.load)) {
        return next.handle(req)
      } else {
        this._LoaderService.isLoading.next(true);
        return next.handle(req).pipe(finalize(
          () => {
            setTimeout(() => {
              this._LoaderService.isLoading.next(false)
            }, 2000);
          }
        ))
      }
    }
  }
}
