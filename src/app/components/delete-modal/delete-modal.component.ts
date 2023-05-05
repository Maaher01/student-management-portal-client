import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  providers: [NgbModal]
})
export class DeleteModalComponent {
  @ViewChild('DeleteModal') private modalContent!: TemplateRef<DeleteModalComponent>
  @Output() newDeleteEvent = new EventEmitter<string>();
  @Input() modalStyle: any;
  @Input() modalTitle: any;
  @Input() modalBody: any;
  @Input() modalButtonColor: any;

  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'sm' })
      this.modalRef.result.then((result) => {
        this.newDeleteEvent.emit(result);
      });
    })
  }
}
