import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private http: HttpClient, private router: Router) { }

  forgotPasswordForm = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256)
    ])
  })

  login() {
    this.http.post(`http://localhost:3000/forgot`, this.forgotPasswordForm.value).subscribe(
      res => {
        this.router.navigate(['/students'])
        console.log(res)
      }
    )
  }
}
