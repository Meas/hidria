import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getGraph(id): Observable<any> {
    return this.service.get(`choose-model/${id}/graph/static_pressure`);
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

  search(data): Observable<any> {
    return this.service.post(`selection/search`, data);
  }
}
