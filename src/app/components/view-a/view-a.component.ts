import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-a',
  templateUrl: './view-a.component.html',
  styleUrls: ['./view-a.component.css']
})
export class ViewAComponent implements OnInit {

  sections = [
    {
      title: 'AC Axial fans',
      items: [
        {
          title: 'Test',
          description: 'Desc'
        },
        {
          title: 'Test',
          description: 'Desc'
        },
        {
          title: 'Test',
          description: 'Desc'
        },
        {
          title: 'Test',
          description: 'Desc'
        }
      ]
    },
    {
      title: 'EC Axial fans',
      items: [
        {
          title: 'Test',
          description: 'Desc'
        },
        {
          title: 'Test',
          description: 'Desc'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
