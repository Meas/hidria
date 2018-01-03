import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class SearchByCodeService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  search(): Observable<any> {
    return this.service.get('search-by-code/code');
  }
}
