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
   * @param data
   * @returns {Observable<boolean>}
   */
  login(data): Observable<any> {
    return this.service.post('login', data);
  }

  /**
   * Register
   * @param data
   * @returns {Observable<boolean>}
   */
  register(data): Observable<any> {
    return this.service.post('register', data);
  }

  /**
   * Change password
   * @param data
   * @returns {Observable<boolean>}
   */
  chanagePassword(data): Observable<any> {
    return this.service.post('change-password', data);
  }

  /**
   * Reset password
   * @param data
   * @returns {Observable<boolean>}
   */
  resetPassword(data): Observable<any> {
    return this.service.post('reset-password', data);
  }
}
