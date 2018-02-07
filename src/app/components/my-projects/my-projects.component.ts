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
  sortBy: String = '';
  modelList: any = [];
  projectsList: any = [];

  constructor(public myProjectsService: MyProjectsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    /* this.myProjectsService.getItems().subscribe((response: any) => {
      this.feature = response;
      this.findByType(this.feature, 'project-list', this.selectedProject);
    }); */
    this.myProjectsService.getProjects().subscribe((response: any) => {
      this.projectsList = response;
      this.onSelectProject(response[0]);
    });
  }


  onNameChange(event): void {
    this.searchTerm = event.toLowerCase();
  }

  onSelectProject(event): void {
    this.selectedProject = Object.assign({}, event);
    this.myProjectsService.getModels(event.id).subscribe((response: any) => {
      if (response.constructor === Array) {
        this.modelList = response;
      } else {
        this.modelList = [];
      }
    });
  }

  findByType(object, type, assignee): void {
    /* for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.findByType(object[x], type, assignee);
        }
        if (x === 'type' && object[x] === type) {
          this.selectedProject = Object.assign({}, object.children[0]);
        }
      }
    } */
  }

  onSortChange(event): void {
    this.sortBy = event;
  }

  onRemoveModel(id): void {
    this.modelList = this.modelList.filter(model => {
      return model.id !== id;
    });
  }

  onDeleteProject(id): void {
    this.projectsList = this.projectsList.filter(project => {
      return project.id !== id;
    });
    if (this.selectedProject['id'] === id) {
      this.selectedProject = this.projectsList[0] ?  this.projectsList[0] : {};
      this.myProjectsService.getModels(this.selectedProject['id']).subscribe((response: any) => {
        if (response.constructor === Array) {
          this.modelList = response;
        } else {
          this.modelList = [];
        }
      });
    }
  }
}
