import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topApps = {
    headers: ['Type', 'Model', 'Sales'],
    data: []
  };
  recentOrders = {
    headers: ['Project ID', 'Items', 'Member', 'Date/time', 'Total'],
    data: []
  };
  generalData = [];
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.getGeneral();
    this.getProduct();
    this.getRecentOrders();
  }

  getGeneral() {
    this.statisticsService.getGeneral().subscribe((response: any) => {
      console.log(response);
      this.generalData = response;
    });
  }
  getProduct() {
    this.statisticsService.getProduct().subscribe((response: any) => {
      console.log(response);
      this.topApps.data = response;
    });
  }
  getRecentOrders() {
    this.statisticsService.getRecentOrders().subscribe((response: any) => {
      console.log(response);
      this.recentOrders.data = response;
    });
  }

}
