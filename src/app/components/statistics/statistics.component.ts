import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topApps = {
    headers: ['Type', 'Art No.', 'Sales'],
    data: []
  };
  recentOrders = {
    headers: ['Order ID', 'Items', 'Member', 'Date/time', 'Total'],
    data: []
  };
  generalData = [];
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.getGeneralForm();
    this.getProductForm();
    this.getRecentOrders();
  }

  getGeneralForm() {
    this.statisticsService.getGeneralForm().subscribe((response: any) => {
      console.log(response);
      this.generalData = response;
    });
  }
  getProductForm() {
    this.statisticsService.getProductForm().subscribe((response: any) => {
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
