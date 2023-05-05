import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!: string

  constructor(private http: HttpClient, private router: Router) { }

  loginForm = new FormGroup({
    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(11)
    ])
  })

  login() {
    this.http.post(`http://localhost:3000/login`, this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.user) {
          let credentials = {name: res.user.name, email: res.user.email}
          localStorage.setItem('credentials', JSON.stringify(credentials))
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
