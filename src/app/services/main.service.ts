import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HelperService} from './helper/helper.service';
import { CustomNotificationsService } from './notifications/notifications.service';
import {catchError, finalize, tap} from 'rxjs/operators';


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

    let headers = new HttpHeaders();
    headers = this.helper.createAuthorizationHeader(headers);

    return this.http.get(this.helper.generateRoute(route, queryParams), {
      headers: headers,
      observe: 'response'
    }).pipe(
      catchError(this.helper.handleError),
      tap(
        obj => obj,
        error => {
          this.notifications.message('error', 'Error', error.message);
        }
      )
    ).map(res => this.helper.checkDataValidity(res));
  }

  /**
   * Post Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<any>}
   */
  post(route: string, data?: {}, queryParams?: {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.helper.createAuthorizationHeader(headers);

    return this.http.post(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    }).pipe(
      catchError(this.helper.handleError),
      tap(
        obj => obj,
        error => {
          this.notifications.message('error', 'Error', error.message);
        }
      )
    ).map(res => this.helper.checkDataValidity(res));
  }

  /**
   * Put Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<any>}
   */
  put(route: string, data?: {}, queryParams?: {}): Observable<any> {

    let headers = new HttpHeaders();
    headers = this.helper.createAuthorizationHeader(headers);

    return this.http.put(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    }).pipe(
      catchError(this.helper.handleError),
      tap(
        obj => obj,
        error => {
          this.notifications.message('error', 'Error', error.message);
        }
      )
    ).map(res => this.helper.checkDataValidity(res));
  }

  /**
   * Delete Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<any>}
   */
  delete(route: string, queryParams?: {}): Observable<any> {

    let headers = new HttpHeaders();
    headers = this.helper.createAuthorizationHeader(headers);

    return this.http.delete(this.helper.generateRoute(route, queryParams), {
      headers: headers
    }).pipe(
      catchError(this.helper.handleError),
      tap(
        obj => obj,
        error => {
          this.notifications.message('error', 'Error', error.message);
        }
      )
    ).map(res => this.helper.checkDataValidity(res));
  }

}
