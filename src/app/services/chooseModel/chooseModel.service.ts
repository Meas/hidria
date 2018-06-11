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
  getSearchCard(data): Observable<any> {
    return this.service.post(`choose-model/card`, data);
  }
  getSearchTable(data): Observable<any> {
    return this.service.post(`choose-model/table`, data);
  }
  getSearchGraph(data): Observable<any> {
    return this.service.post(`choose-model/graph/static_pressure`, data);
  }

  search(data): Observable<any> {
    return this.service.post(`selection/search`, data);
  }
}
