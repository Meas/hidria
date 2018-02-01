import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MainService } from '../main.service';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OperatingPointService {

  constructor(private service: MainService, private http: HttpClient) { }

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
    return this.http.get(`http://13.93.51.225/hidriaAPI/api/v1/choose-model/operating-point/${id}`)
    .catch((err: any) => {
      return Observable.of(err.error);
    });
  }
}
