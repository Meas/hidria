import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topApps = {
    headers: ['Code', 'Type', 'Total', 'User'],
    data: []
  };
  recentOrders = {
    headers: ['Name', 'Email', 'Active', 'Brand', 'Company', 'Country'],
    data: []
  };
  generalData = [];
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.getGeneral();
    this.getTopSearch();
    this.getRecentRegistrations();
  }

  getGeneral() {
    this.statisticsService.getGeneral().subscribe((response: any) => {
      console.log(response);
      this.generalData = response;
    });
  }
  getTopSearch() {
    this.statisticsService.getTopSearch().subscribe((response: any) => {
      console.log(response);
      this.topApps.data = response;
    });
  }
  getRecentRegistrations() {
    this.statisticsService.getRecentRegistrations().subscribe((response: any) => {
      console.log(response);
      this.recentOrders.data = response;
    });
  }

}
