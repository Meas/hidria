import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-b',
  templateUrl: './view-b.component.html',
  styleUrls: ['./view-b.component.css']
})
export class ViewBComponent implements OnInit {

section= [
    {
      buttons: [
        {name: 'one', active: true},
        {name: 'two', active: false}
      ]
    },
    {
      buttons: [
        {name: 'one', active: true},
        {name: 'two', active: false},
        {name: 'two', active: false}
      ]
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
