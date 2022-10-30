import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    //Get the student id from the current route
    const routeParams = this.route.snapshot.paramMap;
    const StudentIdFromRoute = Number(routeParams.get('id'));

    //Find the student corresponding with the id in the route
    this.getStudentById(StudentIdFromRoute);
  }

  getStudentById(id: number) {
    this.http.get(`http://localhost:3000/student/${id}`).subscribe(
      (res: any) => {
        this.student = res[0];
      }
    )
  }

}
