import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MainService} from "../main.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {

  constructor(private service: MainService, private http: HttpClient) {}

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
    // return this.service.post(`login`, data);
    return this.http.post(`http://13.93.51.225/hidriaAPI/api/v1/login`, data)
      .catch((err: any) => {
        return Observable.of(err.error);
      });
  }

  /**
   * Register
   * @returns {Observable<any>}
   */
  register(data): Observable<any> {
    // return this.service.post(`register`, data);
    return this.http.post(`http://13.93.51.225/hidriaAPI/api/v1/register`, data)
      .catch((err: any) => {
        return Observable.of(err.error);
      });
  }

  /**
   * Change password
   * @returns {Observable<any>}
   */
  changePassword(data): Observable<any> {
    // return this.service.post(`change-password`, data);
    return this.http.post(`http://13.93.51.225/hidriaAPI/api/v1/change-password`, data)
      .catch((err: any) => {
        return Observable.of(err.error);
      });
  }

  /**
   * Reset password
   * @returns {Observable<any>}
   */
  resetPassword(data): Observable<any> {
    // return this.service.post(`reset-password`, data);
    return this.http.post(`http://13.93.51.225/hidriaAPI/api/v1/reset-password`, data)
      .catch((err: any) => {
        return Observable.of(err.error);
      });
  }
}
