import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  errorMsg:string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
  })

  constructor(private _AuthService: AuthService, private _Route:Router) { }

  loginUser(data: FormGroup) {
    this.isLoading = true;
    this._AuthService.login(data.value).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token)
          this._Route.navigate(['/home']);
          this._AuthService.userData();
        }
      },
      error: (myErrors) => {
        this.isLoading = false;
        this.errorMsg = myErrors.error.message;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

}
