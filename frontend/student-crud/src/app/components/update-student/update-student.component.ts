import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  student: any = {};
  studentId: number = 0

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
      }
    )
  }

  updateStudent(id: number) {
    this.http.put(`http://localhost:3000/update/${this.studentId}`, this.student).subscribe()
    this.router.navigate(['./'])
  }
}
