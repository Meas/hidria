import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  sections= [
  {
    name: "section 1",
    formFields: [
      {
        id: 0,
        type: "radio",
        obj: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 1,
        type: "radio",
        obj: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2},
          {name: 'three', active: false, value: 3}
        ]
      },
      {
        id: 2,
        type: "radio",
        obj: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 3,
        type: "select",
        obj: [
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]
      },
    ]
  }
  ];
  formBoxes=[
  ];

  constructor() { }

  ngOnInit() {
  }


  onValueEmitted(event) {
    console.log(event);
  }
}