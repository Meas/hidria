import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class HelperService {

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
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  }

  /**
   * Function checks response data validity
   *
   * @param response
   * @returns response
   */
  checkDataValidity(response): any {
    return response;
  }

}
