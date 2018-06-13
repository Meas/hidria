import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class UserService {

  constructor(private service: MainService, private helper: HelperService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('users');
  }

  updateMetricSystem(metric): Observable<any> {
    return this.service.get(`users/${this.helper.getUserId()}/metric/${metric}`);
  }

  updateUser(data): Observable<any> {
    return this.service.post('users/edit', data);
  }

  activateUser(id): Observable<any> {
    return this.service.get(`users/activate/${id}`);
  }

  banUser(id): Observable<any> {
    return this.service.get(`users/ban/${id}`);
  }

  deleteUser(id): Observable<any> {
    return this.service.get(`users/delete/${id}`);
  }
}
