import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MainService } from '../main.service';

@Injectable()
export class ChooseModelService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(id, section): Observable<any> {
    return this.service.get(`choose-model/${id}/${section}`);
  }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  postItems(data): Observable<any> {
    return this.service.post('choose-model', data);
  }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getCard(data): Observable<any> {
    return this.service.post(`choose-model/card`);
  }
}
