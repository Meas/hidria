import { HttpHeaders } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HelperService {

  constructor() {
  }

  /**
   * Function combines route url and query params
   *
   * @param route
   * @param queryParams
   * @returns {string}
   */
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
    return headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  }

  /**
   * Function checks response data validity
   *
   * @param response
   * @returns response
   */
  checkDataValidity(response) {
    return response.hasOwnProperty('body') ? response.body : response;
  }

  checkAuth(error: any): any {
    if (error.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    return Observable.create(false);
  }

  getUserId() {
    return localStorage.getItem('id');
  }

}
