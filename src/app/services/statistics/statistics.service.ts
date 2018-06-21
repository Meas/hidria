import { Injectable } from '@angular/core';
import {MainService} from '../main.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private service: MainService) { }

  /**
   * Get general statistics
   * @returns {Observable<any>}
   */
  getGeneral(): Observable<any> {
    return this.service.get('statistics/general');
  }

  /**
   * Get product statistics
   * @returns {Observable<any>}
   */
  getProduct(): Observable<any> {
    return this.service.get('statistics/top/products');
  }

  /**
   * Get recent orders statistics
   * @returns {Observable<any>}
   */
  getRecentOrders(): Observable<any> {
    return this.service.get('statistics/recent/orders');
  }
}
