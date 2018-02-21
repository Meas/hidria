import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MyProjectsService {

  constructor(private service: MainService, private http: HttpClient) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('my-projects');
  }
  getProjects(): Observable<any> {
    /* return this.service.get('users/1/projects'); */
    return this.http.get('http://13.93.51.225/hidriaAPI/api/v1/users/1/projects')
    .catch((err: any) => {
      return Observable.of(err.error);
    });
  }
  deleteProject(projectId): Observable<any> {
    return this.service.delete(`projects/${projectId}`);
  }
  getModels(id): Observable<any> {
    /* return this.service.get(`projects/${id}`); */
    return this.http.get(`http://13.93.51.225/hidriaAPI/api/v1/projects/${id}`)
    .catch((err: any) => {
      return Observable.of(err.error);
    });
  }
  deleteModel(projectId, modelId): Observable<any> {
    return this.service.delete(`project/${projectId}/models/${modelId}/notes`);
  }
  saveNote(note, modelId, projectId) {
    console.log(note, modelId, projectId);
    return this.service.post(`projects/${projectId}/models/${modelId}/notes`, note);
  }
}
