import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any
  student: any
  selectedUserId: string

  @ViewChild('DeleteModal') 
  private modalComponent!: DeleteModalComponent;

  modalStyle: string = 'modal-style-danger';
  modalTitle: string = 'Confirmation';
  modalBody: string = 'Are you sure you want to delete this student?';
  modalButtonColor: string = 'btn-danger';

  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents() {
    this.http.get('http://localhost:3000/students').subscribe(data => {
      this.students = data
    })
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  open(studentId: string){
    this.selectedUserId = studentId
    this.openModal()
  }

  getDeleteValue($event: string) {
    if ($event == 'Delete Student') {
      this.deleteStudent()
    }
  }

  deleteStudent() {
    if(!this.selectedUserId) return
    this.http.delete(`http://localhost:3000/delete/${this.selectedUserId}`).subscribe(
      res => {
        this.getAllStudents()
        console.log(res)
      }
    )
  }

  goToDetails(id: string) {
    this.router.navigate([`/student/${id}`])
  }

  goToUpdate(id: string) {
    this.router.navigate([`/update/${id}`])
  }
}

