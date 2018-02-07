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
  getModels(id): Observable<any> {
    return this.service.get(`projects/${id}`);
  }
}
