import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  full_name: string = ''
  id: number = 0
  department: string = ''
  semester_no: number = 0
  current_cgpa: number = 0 
  mobile_no: string = '' 
  email: string = '' 
  dob: string = ''
  gender: string = ''
  address: string = ''
  father_name: string = ''
  mother_name: string = ''

  constructor(private http: HttpClient, private router: Router) { }

  createStudent(full_name: string, id: number, department: string, semester_no: number, current_cgpa: number, mobile_no: string, email: string, dob: string, gender: string, address: string, father_name: string, mother_name: string) {
    let student = {
      full_name: full_name,
      id: id,
      department: department,
      semester_no: semester_no,
      current_cgpa: current_cgpa,
      mobile_no: mobile_no,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      father_name: father_name,
      mother_name: mother_name
    }
    this.http.post(`http://localhost:3000/students`, student).subscribe(
      res => {
        this.router.navigate(['/students'])
        console.log(res)
      }
    )
  }
}
