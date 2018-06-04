import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';

@Injectable()
export class SearchByCodeService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  search(data): Observable<any> {
    return this.service.post(`search-by-code`, {
      searchText: data
    });
  }
}
