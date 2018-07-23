import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import {HelperService} from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  permissions: Subject<any> = new Subject();

  constructor(private service: MainService, private http: HttpClient, private helper: HelperService) {}

  setPermissions(payload) {
    if (payload) {
      this.permissions.next(payload);
    } else {
      this.getUser(this.helper.getUserId()).subscribe((res: any) => {
        this.permissions.next({
          admin: res.admin,
          comparison: res.comparison
        });
      });
    }
  }

  /**
   * Is Logged In
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined;
  }

  /**
   * Is Allowed to access
   * @returns {Observable<boolean>}
   */
  isAllowed(): boolean {
    return  !!localStorage.getItem('permissions') && JSON.parse(localStorage.getItem('permissions'));
  }

  /**
   * Login
   * @returns {Observable<any>}
   */
  login(data): Observable<any> {
    return this.service.post(`login`, data);
  }

  /**
   * Register
   * @returns {Observable<any>}
   */
  register(data): Observable<any> {
    return this.service.post(`register`, data);
  }

  /**
   * Change password
   * @returns {Observable<any>}
   */
  changePassword(data): Observable<any> {
    return this.service.post(`change-password`, data);
  }

  /**
   * Reset password
   * @returns {Observable<any>}
   */
  resetPassword(data): Observable<any> {
    return this.service.get(`reset-password?${data}`);
  }

  resetPass(data): Observable<any> {
    return this.service.post(`reset-password`, data);
  }

  getRegisterFields(): Observable<any> {
    return this.service.get(`register`);
  }

  getUser(id): Observable<any> {
    return this.service.get(`users/${id}`);
  }

  updateUser(data): Observable<any> {
    return this.service.post(`users/edit`, data);
  }
}
