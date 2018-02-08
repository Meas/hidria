import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-my-projects-model-list',
  templateUrl: './my-projects-model-list.component.html',
  styleUrls: ['./my-projects-model-list.component.scss']
})
export class MyProjectsModelListComponent implements OnInit {

  @Input() modelList;
  @Output() removeModel: EventEmitter<any> = new EventEmitter;
  @Output() saveNoteEmitter: EventEmitter<any> = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }

  deleteItem(id) {
    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'This will remove the model from this project!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, delete it!'
    }).then(function(e: any){
      if (e.value) {
        self.removeModel.emit(id);
        swal({
          title: 'Deleted!',
          text: 'Model successfully removed!.',
          type: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
  saveNote(note, modelId) {
    note.classList.add('disabled');
    this.saveNoteEmitter.emit([note.value, modelId]);
  }
  editNote(note) {
    note.classList.remove('disabled');
  }
}
