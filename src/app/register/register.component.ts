import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg:string = '';
  isLoading: boolean = false;
  registerFrom: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]),
  })

  constructor(private _AuthService: AuthService, private _Route:Router) { }
  registerUser(data: FormGroup) {
    this.isLoading = true;
    this._AuthService.register(data.value).subscribe({
      next: (response) => { 
        if (response.message == 'success') {
          this._Route.navigate(['/login'])
        }
      },
      error: (myErrors) => {
        console.log(myErrors);
        console.log(myErrors.error.message);
        
        
        this.isLoading = false;
        this.errorMsg = myErrors.error.message;
        this.errorMsg = myErrors.error.message;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

}
