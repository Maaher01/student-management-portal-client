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
      next : (res: any) => {
        if(res.user) {
          localStorage.setItem('email', res.user.email)
          this.router.navigateByUrl('/students')
        }else {
          this.router.navigateByUrl('/login')
        }
      }
    })
  }

}
