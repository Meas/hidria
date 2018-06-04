import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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
  }
}
