import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';
import {HelperService} from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {

  constructor(private service: MainService, private helper: HelperService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getProjects(): Observable<any> {
    return this.service.get(`users/${this.helper.getUserId()}/projects`);
  }
  getDatasheet(projectId): Observable<any> {
    return this.service.post(`projects/${projectId}/datasheet`);
  }
  createProject(data) {
    return this.service.post(`${this.helper.getUserId()}/projects`, data);
  }
  updateProject(data) {
    return this.service.post(`${this.helper.getUserId()}/projects`, data);
  }
  deleteProject(projectId): Observable<any> {
    return this.service.delete(`projects/${projectId}`);
  }

  getModels(id): Observable<any> {
    return this.service.get(`projects/${id}`);
  }
  insertModels(id, models): Observable<any> {
    return this.service.post(`projects/${id}`, models);
  }
  deleteModel(projectId, modelId): Observable<any> {
    return this.service.delete(`projects/${projectId}/models/${modelId}`);
  }

  saveNote(note, projectId, modelId) {
    return this.service.post(`projects/${projectId}/models/${modelId}/notes`, note);
  }
  savePosition(position, projectId, modelId) {
    return this.service.post(`projects/${projectId}/models/${modelId}/position/${position}`);
  }
  saveItems(items, projectId, modelId) {
    return this.service.post(`projects/${projectId}/models/${modelId}/items/${items}`);
  }
}
