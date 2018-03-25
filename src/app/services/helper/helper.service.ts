import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {CustomNotificationsService} from '../notifications/notifications.service';

import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class HelperService {

  /**
   * Function combines route url and query params
   *
   * @param route
   * @param queryParams
   * @returns {string}
   */
  constructor(private notifications: CustomNotificationsService) {}
  generateRoute(route: string, queryParams?: {}): string {

    const rootUrl = environment.api;

    let reqUrl = rootUrl + '/api/v1/' + route;
    if (queryParams) {
      reqUrl += '?';
      for (const obj in queryParams) {
        if (obj) {
          reqUrl += obj + '=' + queryParams[obj] + '&';
        }
      }
    }

    return reqUrl;
  }

  /**
   * Function creates authorization headers
   *
   * @param headers
   * @returns headers
   */
  createAuthorizationHeader(headers: HttpHeaders): any {
    return headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
            .append('Content-Type', 'application/x-www-form-urlencoded');
  }

  /**
   * Function checks response data validity
   *
   * @param response
   * @returns response
   */
  checkDataValidity(response) {
    // if (response.body.notification) {
    //   this.notifications.notificationByType(response.body.notification);
    // }
    return response.hasOwnProperty('body') ? response.body : response;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable('Something bad happened; please try again later.');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

}
