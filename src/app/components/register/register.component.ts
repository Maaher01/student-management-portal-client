import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router) { }

  registerForm = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256)
    ]),

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

  register() {
    this.http.post(`http://localhost:3000/users`, this.registerForm.value).subscribe(
      res => {
        this.router.navigate(['/students'])
        console.log(res)
      }
    )
  }
}
