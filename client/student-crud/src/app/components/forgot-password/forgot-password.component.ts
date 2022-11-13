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
  errorMessage !: string
  constructor(private http: HttpClient, private router: Router) { }

  forgotPasswordForm = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256)
    ])
  })

  login() {
    this.http.post(`http://localhost:3000/forgot`, this.forgotPasswordForm.value).subscribe({
      next: (res: any) => {
        if (res.user) {
          localStorage.setItem('email', res.user.email)
          this.router.navigateByUrl('/students')
        } else {
          this.router.navigateByUrl('/login')
        }
      },
      error: (err) => {
        this.errorMessage = err.error.error
      }
    },)
  }
}
