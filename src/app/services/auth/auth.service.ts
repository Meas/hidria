import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor() {}

  /**
   * Is Logged In
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined;
  }
}
