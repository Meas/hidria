import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HelperService} from './helper/helper.service';
import { CustomNotificationsService } from './notifications/notifications.service';


@Injectable()
export class MainService {

  constructor(private http: HttpClient, private helper: HelperService,
              private notifications: CustomNotificationsService) { }

  /**
   * Get Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<any>}
   */
  get(route: string, queryParams?: {}): Observable<any> {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.get(this.helper.generateRoute(route, queryParams), {
      headers: headers,
      observe: 'response'
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: any) => {
        this.notifications.getError(err);
        return Observable.of(err.error);
      });
  }

  /**
   * Post Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<any>}
   */
  post(route: string, data?: {}, queryParams?: {}): any {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.post(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        return Observable.of(err);
      });
  }

  /**
   * Put Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<any>}
   */
  put(route: string, data?: {}, queryParams?: {}) {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.put(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        return Observable.of(err);
      });
  }

  /**
   * Delete Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<any>}
   */
  delete(route: string, queryParams?: {}) {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.delete(this.helper.generateRoute(route, queryParams), {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        return Observable.of(err);
      });
  }

}
