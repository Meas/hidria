import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';

@Injectable()
export class UserService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('users');
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
