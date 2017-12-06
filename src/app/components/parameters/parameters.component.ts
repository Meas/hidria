import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  sections= [
  {
    name: 'section 1',
    header: [
      {
        id: 3,
        type: 'select',
        label: 'Select I',
        options: [
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]
      }
    ],
    formFields: [
      {
        id: 0,
        type: 'accordion',
        label: 'Some Input',
        value: 'Default'
      },
      {
        id: 0,
        type: 'input',
        label: 'Some Input',
        value: 'Default'
      },
      {
        id: 1,
        type: 'input',
        label: 'Some Input I',
        value: 'Default I'
      }
    ]
  },
  {
    name: 'section 2',
    formFields: [
      {
        id: 3,
        type: 'select',
        options: [
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]
      },
      {
        id: 3,
        type: 'select',
        options: [
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]
      },
      {
        id: 3,
        type: 'select',
        options: [
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]
      },
      {
        id: 0,
        type: 'input',
        label: 'Some Input',
        value: 'Default'
      },
      {
        id: 0,
        type: 'input',
        label: 'Some Input',
        value: 'Default'
      },
      {
        id: 0,
        type: 'input',
        label: 'Some Input',
        value: 'Default'
      },
    ]
  },
  {
    name: 'section 3',
    formFields: [
      {
        id: 0,
        type: 'radio',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 1,
        type: 'radio',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2},
          {name: 'three', active: false, value: 3}
        ]
      },
      {
        id: 2,
        type: 'radio',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 0,
        type: 'radio',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 0,
        type: 'radio',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 3,
        type: 'select',
        options: [
          {name: 'one', value: 1},
          {name: 'two', value: 2},
          {name: 'three', value: 3}
        ]
      },
    ]
  }
  ];
  formBoxes= [
  ];

  constructor() { }

  ngOnInit() {
  }


  saveFormResults(formBox, id) {
    this.formBoxes[id] = formBox;
  }
}
