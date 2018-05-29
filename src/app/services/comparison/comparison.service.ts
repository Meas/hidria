import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';
import {HelperService} from '../helper/helper.service';

@Injectable()
export class ComparisonService {

  constructor(private service: MainService, private helper: HelperService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get(`users/${this.helper.getUserId()}/comparisons`);
  }

  getOneComparison(id): Observable<any> {
    return this.service.get(`comparison/${id}`);
  }
  calculate(event): Observable<any> {
    // ToDo format data from event and send request appropriately
    return this.service.get('comparisons');
  }
  getTabs(): Observable<any> {
    return this.service.get('comparisons/tabs');
  }
  getModelList(comparisonId): Observable<any> {
    return this.service.get(`users/comparisons/models/${comparisonId}`);
  }
  getGraph(comparisonId): Observable<any> {
    return this.service.get(`users/comparisons/graph/${comparisonId}`);
  }
  getComparisonList(userId): Observable<any> {
    return this.service.get(`users/${userId}/comparisons`);
  }
}
