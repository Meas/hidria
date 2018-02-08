import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class MyProjectsService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('my-projects');
  }
  getProjects(): Observable<any> {
    return this.service.get('users/1/projects');
  }
  deleteProject(projectId): Observable<any> {
    return this.service.delete(`projects/${projectId}`);
  }
  getModels(id): Observable<any> {
    return this.service.get(`projects/${id}`);
  }
  deleteModel(projectId, modelId): Observable<any> {
    return this.service.delete(`project/${projectId}/models/${modelId}/notes`);
  }
  saveNote(note, modelId, projectId) {
    console.log(note, modelId, projectId);
    return this.service.post(`projects/${projectId}/models/${modelId}/notes`, note);
  }
}
