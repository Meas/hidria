import {Component, OnInit, ViewChild} from '@angular/core';
import { MyProjectsService } from './../../services/my-projects/my-projects.service';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  loading = true;

  feature: any = {};
  searchTerm: String = '';
  selectedProject;
  sortBy: String = '';
  modelList: any = [];
  projectsList: any = [];

  projectID;
  modelID;

  view = '';
  visible = false;
  editing = false;

  @ViewChild('myModal') myModal: ModalComponent;
  @ViewChild('myItemModal') myItemModal: ModalComponent;

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
        return obj;
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

  onSortChange(event): void {
    this.sortBy = event;
  }

  confirmModelDelete(id) {
    this.modelID = id;
    console.log(id);
    this.myItemModal.visible = true;
  }
  onRemoveModel(): void {
    this.myProjectsService.deleteModel(this.selectedProject['id'], this.modelID).subscribe((response: any) => {
      console.log(response);
      this.modelList = this.modelList.filter(model => {
        return model.id !== this.modelID;
      });
      this.myItemModal.visible = false;
      this.notification.message('success', 'Success', 'Model successfully deleted');
      this.getItems();
    });
  }
  cancelItemDelition() {
    this.myItemModal.visible = false;
  }

  confirmDelete(id) {
    this.projectID = id;
    this.myModal.visible = true;
  }
  onDeleteProject(): void {
    this.myProjectsService.deleteProject(this.projectID).subscribe((response: any) => {
      console.log(response);
      this.notification.message('success', 'Success', 'Project successfully deleted');
      this.getItems();
      this.selectedProject = null;
      this.myModal.visible = false;
    });
  }
  cancelDelition() {
    this.myModal.visible = false;
  }
  onNoteSave(event) {
    this.myProjectsService.saveNote({ note: event.note }, this.selectedProject.id, event.id).subscribe((response: any) => {
      console.log(response);
    });
  }
  onPositionSave(event) {
    this.myProjectsService.savePosition(event.position, this.selectedProject.id, event.id).subscribe((response: any) => {
      console.log(response);
    });
  }
  onItemsSave(event) {
    this.myProjectsService.saveItems(event.items, this.selectedProject.id, event.id).subscribe((response: any) => {
      console.log(response);
    });
  }

  createProject() {
    this.view = 'create-project';
  }
  editProject() {
    this.view = 'create-project';
    this.editing = true;
  }

  saveProject(data) {
    const obj = {};
    data.data.forEach(el => {
      Object.defineProperty(obj, el.parameter, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: el.defaultOption
      });
    });
    if (data.id) {
      Object.defineProperty(obj, 'id', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: data.id
      });
    }
    this.myProjectsService.createProject(obj).subscribe((response: any) => {
      if (response.messageType !== 'error') {
        this.view = '';
        this.getItems();
      }
      this.translate.get(response.message).subscribe((res: string) => {
        this.notification.message(response.messageType, response.messageType, res);
      });
    });

    this.myProjectsService.updateProject(obj).subscribe((response: any) => {
      if (response.messageType !== 'error') {
        this.view = '';
        this.getItems();
      }
      this.translate.get(response.message).subscribe((res: string) => {
        this.notification.message(response.messageType, response.messageType, res);
      });
    });
  }
  updateProject() {
    this.myProjectsService.updateProject(this.selectedProject).subscribe((response: any) => {
      if (response.messageType !== 'error') {
        this.view = '';
        this.getItems();
      }
      this.translate.get(response.message).subscribe((res: string) => {
        this.notification.message(response.messageType, response.messageType, res);
      });
    });
  }
}
