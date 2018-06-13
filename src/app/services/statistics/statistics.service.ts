import { Injectable } from '@angular/core';
import {MainService} from '../main.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private service: MainService) { }

  getGeneralForm(): Observable<any> {
    return this.service.get('statistics/general');
  }
  getProductForm(): Observable<any> {
    return this.service.get('statistics/top/products');
  }
  getRecentOrders(): Observable<any> {
    return this.service.get('statistics/recent/orders');
  }
}
