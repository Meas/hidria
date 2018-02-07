import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-my-projects-title',
  templateUrl: './my-projects-title.component.html',
  styleUrls: ['./my-projects-title.component.scss']
})
export class MyProjectsTitleComponent implements OnInit {

  @Input() project;
  @Output() deleteProject: EventEmitter<any> = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }

  deleteThisProject() {
    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'This will delete project!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, delete it!'
    }).then(function(e: any){
      if (e.value) {
        self.deleteProject.emit(self.project.id);
        swal({
          title: 'Deleted!',
          text: 'Project successfully deleted!.',
          type: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}
