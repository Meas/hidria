import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-my-projects-list',
  templateUrl: './my-projects-list.component.html',
  styleUrls: ['./my-projects-list.component.scss']
})
export class MyProjectsListComponent implements OnInit {

  @Input() projectsList: any;
  @Input() searchTerm;
  @Input() sortBy;
  @Output() selectProject: EventEmitter<string> = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
  }

  dateFromTimestamp(timestamp) {
    return moment.unix(timestamp).format('DD.MM.YYYY');
  }
}
