import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MainService } from '../main.service';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class OperatingPointService {

  constructor(private service: MainService, private http: HttpClient, private helper: HelperService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('choose-model/operating-point/id');
  }
  calculate(event): Observable<any> {
    // ToDo format data from event and send request appropriately
    return this.service.get('choose-model/operating-point/calculate/id');
  }
  getCustomItems(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}`)
    .catch((err: any) => {
      return Observable.of(err.error);
    });
  }
  getProjects(): Observable<any> {
    const userId = localStorage.getItem('id');
    return this.service.get(`users/${userId}/projects`)
    .catch((err: any) => {
      return Observable.of(err.error);
    });
  }
  addToEntity(form, view): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.helper.createAuthorizationHeader(headers);
    const type = view === 'add-to-project' ? 'projects' : 'comparisons';
    const userId = localStorage.getItem('id');
    return this.service.post(`users/${userId}/${type}`, form.value, {headers: headers})
    .catch((err: any) => {
      console.log(err);
      return Observable.of(err.error);
    });
  }
}
