import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  student: any = {};
  studentId: number = 0

  updateStudentForm = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256)
    ]),

    department : new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256)
    ]),

    semester : new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2)
    ]),

    cgpa : new FormControl('', [
      Validators.required
    ]),

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Get the student id from the current route
    const routeParams = this.route.snapshot.paramMap;
    this.studentId = Number(routeParams.get('id'));

    //Find the student corresponding with the id in the route
    this.getStudentByIdtoEdit()
  }

  getStudentByIdtoEdit() {
    this.http.get(`http://localhost:3000/student/${this.studentId}`).subscribe(
      (res: any) => {
        this.student = res[0];
        this.updateStudentForm.patchValue({
          name: this.student.full_name,
          department: this.student.department,
          semester: this.student.semester_no,
          cgpa: this.student.current_cgpa,
          mobile: this.student.mobile_no,
          email: this.student.email,
          dob: new DatePipe('en-US').transform(this.student.dob, 'yyyy-MM-dd'),
          gender: this.student.gender,
          address: this.student.address,
          fatherName: this.student.father_name,
          motherName: this.student.mother_name
        })
        console.log(this.student)
      }
    )
  }

  updateStudent(id: number) {
    this.http.put(`http://localhost:3000/update/${this.studentId}`, this.student).subscribe()
    this.router.navigate(['./students'])
  }
}
