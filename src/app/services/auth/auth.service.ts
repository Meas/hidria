import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MainService} from "../main.service";

@Injectable()
export class AuthService {

  constructor(private service: MainService) {}

  /**
   * Is Logged In
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined;
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
    return this.service.post(`reset-password`, data);
  }
}
