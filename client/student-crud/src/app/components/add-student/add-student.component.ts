import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  constructor(private http: HttpClient, private router: Router) { }

    addStudentForm = new FormGroup({
      name : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256)
      ]),

      id : new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),

      department : new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(256)
      ]),

      semester : new FormControl('', [
        Validators.required,
        Validators.maxLength(2)
      ]),

      cgpa : new FormControl('', []),

      mobile : new FormControl('', [
        Validators.required
      ]),

      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      dob : new FormControl('', [
        Validators.required
      ]),

      gender : new FormControl('', [
        Validators.required
      ]),

      address : new FormControl('', [
        Validators.required,
        Validators.maxLength(256)
      ]),

      fatherName : new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),

      motherName : new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    })

    createStudent() {
      this.http.post(`http://localhost:3000/students`, this.addStudentForm.value).subscribe(
        res => {
          this.router.navigate(['/students'])
        }
      )
    }
  }
