import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class OperatingPointService {

  constructor(private service: MainService) { }

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
}
