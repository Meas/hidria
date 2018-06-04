import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';

@Injectable()
export class CatalogueService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('catalogue');
  }

  /**
   * Gets single item
   * @param id
   * @returns {Observable<any>}
   */
  getItem(id): Observable<any> {
    return this.service.get(`fans/${id}`);
  }
}
