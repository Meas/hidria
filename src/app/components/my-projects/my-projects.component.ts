import {Component, Input, NgZone, OnInit} from '@angular/core';
import * as _ from 'lodash';
import { MyProjectsService } from './../../services/my-projects/my-projects.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  feature: any = {};
  searchTerm: String = '';
  selectedProject: {};

  constructor(public myProjectsService: MyProjectsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.myProjectsService.getItems().subscribe((response: any) => {
      this.feature = response;
      this.findByType(this.feature, 'project-list', this.selectedProject);
    });
  }


  onNameChange(event): void {
    this.searchTerm = event.toLowerCase();
  }

  onSelectProject(event): void {
    this.selectedProject = Object.assign({}, event);
  }

  findByType(object, type, assignee): void {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.findByType(object[x], type, assignee);
        }
        if (x === 'type' && object[x] === type) {
          this.selectedProject = Object.assign({}, object.children[0]);
        }
      }
    }
  }
}
