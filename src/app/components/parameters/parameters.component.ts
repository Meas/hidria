import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  section= [
    {
      buttons: [
        {name: 'one', active: true, value: 1},
        {name: 'two', active: false, value: 2}
      ]
    },
    {
      buttons: [
        {name: 'one', active: true, value: 1},
        {name: 'two', active: false, value: 2},
        {name: 'three', active: false, value: 3}
      ]
    },
    {
      buttons: [
        {name: 'one 1', active: true, value: 1},
        {name: 'two 2', active: false, value: 2},
        {name: 'three 3', active: false, value: 3}
      ]
    },
  ]
  constructor() { }

  ngOnInit() {
  }

  onValueEmitted(event) {
    console.log(event);
  }
}
