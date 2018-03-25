import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topApps = {
    headers: ['Type', 'Art No.', 'Sales'],
    rows: [
      {
        values: ['AC Axial fans', 'R09-3018H-2M-4248', '€ 11.100']
      },
      {
        values: ['AC Axial fans', 'R09-3018H-2M-4248', '€ 21.100']
      },
      {
        values: ['AC Axial fans', 'R09-3018H-2M-4248', '€ 10.100']
      },
      {
        values: ['AC Axial fans', 'R09-3018H-2M-4248', '€ 5.000']
      },
      {
        values: ['AC Axial fans', 'R09-3018H-2M-4248', '€ 21.100']
      }
    ]
  }
  recentOrders = {
    headers: ['Order ID', 'Items', 'Member', 'Date/time', 'Total'],
    rows: [
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      },
      {
        values: ['1200', 'R09-3018H-2M-4248', 'John Doe', '8/01/2017 12:33:00', '€ 21.100']
      }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
