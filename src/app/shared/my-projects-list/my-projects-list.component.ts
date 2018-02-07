import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';

import { MyProjectsService } from '../../services/my-projects/my-projects.service';

@Component({
  selector: 'app-my-projects-list',
  templateUrl: './my-projects-list.component.html',
  styleUrls: ['./my-projects-list.component.scss']
})
export class MyProjectsListComponent implements OnInit {

  /* @Input() projectsList: any; */
  projectsList: any;
  @Input() searchTerm;
  @Input() sortBy;
  @Output() selectProject: EventEmitter<string> = new EventEmitter;

  constructor(public myProjectsService: MyProjectsService) {
  }

  ngOnInit() {
    this.myProjectsService.getProjects().subscribe((response: any) => {
      this.projectsList = response;
      this.selectProject.emit(response[0]);
    });
  }

  dateFromTimestamp(timestamp) {
    return moment.unix(timestamp).format('DD.MM.YYYY');
  }
}
