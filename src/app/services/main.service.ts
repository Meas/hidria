import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HelperService} from './helper/helper.service';


@Injectable()
export class MainService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  /**
   * Get Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  get(route: string, queryParams?: {}): Observable<any> {

    const headers = new Headers();
    this.helper.createAuthorizationHeader(headers);

    return this.http.get(this.helper.generateRoute(route, queryParams), {
      headers: headers
    })
      .map((res: Response) => this.helper.checkDataValidity(res.json()))
      .catch((err: any) => {
        return Observable.of(err);
      });
  }

  /**
   * Post Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<R>}
   */
  post(route: string, data?: {}, queryParams?: {}): any {

    const headers = new Headers();
    this.helper.createAuthorizationHeader(headers);

    return this.http.post(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: Response) => this.helper.checkDataValidity(res.json()))
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
   * @returns {Observable<R>}
   */
  put(route: string, data?: {}, queryParams?: {}) {

    const headers = new Headers();
    this.helper.createAuthorizationHeader(headers);

    return this.http.put(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: Response) => this.helper.checkDataValidity(res.json()))
      .catch((err: Error) => {
        return Observable.of(err);
      });
  }

  /**
   * Delete Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  delete(route: string, queryParams?: {}) {

    const headers = new Headers();
    this.helper.createAuthorizationHeader(headers);

    return this.http.delete(this.helper.generateRoute(route, queryParams), {
      headers: headers
    })
      .map((res: Response) => this.helper.checkDataValidity(res.json()))
      .catch((err: Error) => {
        return Observable.of(err);
      });
  }

}
