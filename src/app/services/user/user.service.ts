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

  /**
   * Updated metric system for user
   * @param metric
   * @returns {Observable<any>}
   */
  updateMetricSystem(metric): Observable<any> {
    return this.service.get(`users/${this.helper.getUserId()}/metric/${metric}`);
  }

  /**
   * Updates user
   * @param data
   * @returns {Observable<any>}
   */
  updateUser(data): Observable<any> {
    return this.service.post('users/edit', data);
  }

  /**
   * Activates user
   * @param id
   * @returns {Observable<any>}
   */
  activateUser(id): Observable<any> {
    return this.service.get(`users/activate/${id}`);
  }

  /**
   * Bans user
   * @param id
   * @returns {Observable<any>}
   */
  banUser(id): Observable<any> {
    return this.service.get(`users/ban/${id}`);
  }

  /**
   * Deletes user
   * @param id
   * @returns {Observable<any>}
   */
  deleteUser(id): Observable<any> {
    return this.service.get(`users/delete/${id}`);
  }
}
