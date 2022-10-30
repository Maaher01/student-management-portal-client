import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any
  student: any
  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents() {
    this.http.get('http://localhost:3000/students').subscribe(data => {
      this.students = data
      console.log(this.students)
    })
  }

  deleteStudent(id: string) {
    this.http.delete(`http://localhost:3000/delete/${id}`).subscribe(
      res => {
        this.getAllStudents()
        console.log(res)
      }
    )
  }

  goToDetails(id: string){
    this.router.navigate([`/student/${id}`])
  }

  goToUpdate(id: string){
    this.router.navigate([`/update/${id}`])
  }

}
