import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-my-projects-list',
  templateUrl: './my-projects-list.component.html',
  styleUrls: ['./my-projects-list.component.scss']
})
export class MyProjectsListComponent implements OnInit {

  @Input() projectsList: any;
  @Input() searchTerm;
  @Output() selectProject: EventEmitter<string> = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }
}
