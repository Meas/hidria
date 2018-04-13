import {Component, OnInit} from '@angular/core';
import { MyProjectsService } from './../../services/my-projects/my-projects.service';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  loading = true;

  feature: any = {};
  searchTerm: String = '';
  selectedProject: {};
  sortBy: String = '';
  modelList: any = [];
  projectsList: any = [];

  projectForm: FormGroup;

  view = '';

  constructor(private myProjectsService: MyProjectsService,
              private notification: CustomNotificationsService,
              private translate: TranslateService) {}

  ngOnInit() {
    this.getItems();
    console.log(this.projectsList);
    this.selectedProject = this.projectsList[0];
  }

  getItems(): void {
    this.myProjectsService.getProjects().subscribe((response: any) => {
      this.projectsList = response.map(obj => {
        Object.defineProperty(obj, 'selected', {
          enumerable: true,
          configurable: true,
          writable: true,
          value: false
        });
      });
      this.loading = false;
    });
  }

  onNameChange(event): void {
    this.searchTerm = event.toLowerCase();
  }

  onSelectProject(event): void {
    this.selectedProject = Object.assign({}, event);
    this.myProjectsService.getModels(event.id).subscribe((response: any) => {
      console.log(response);
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
    this.myProjectsService.deleteProject(id).subscribe((response: any) => {
      console.log(response);
    });
    // this.projectsList = this.projectsList.filter(project => {
    //   return project.id !== id;
    // });
    // if (this.selectedProject['id'] === id) {
    //   this.selectedProject = this.projectsList[0] ?  this.projectsList[0] : {};
    //   this.myProjectsService.getModels(this.selectedProject['id']).subscribe((response: any) => {
    //     if (response.constructor === Array) {
    //       this.modelList = response;
    //     } else {
    //       this.modelList = [];
    //     }
    //   });
    // }
  }
  onNoteSave(note) {
    // note[0] => message, note[1] => modelId
    this.myProjectsService.saveNote(note[0], note[1], this.selectedProject['id']).subscribe((response: any) => {
      console.log(response);
    });
  }
  createProject() {
    this.view = 'create-project';
  }
  saveProject(data) {
    this.myProjectsService.createProject(data.value).subscribe((response: any) => {
      this.view = '';
      this.getItems();
      this.translate.get('TRANSLATE.PROJECT').subscribe((res: string) => {
        this.notification.message('success', 'Success', 'Project is created');
      });
    });
  }
}
