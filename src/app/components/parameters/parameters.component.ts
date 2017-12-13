import { Component, OnInit } from '@angular/core';
import {SelectionService} from "../../services/selection/selection.service";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
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
        label: 'Test label',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 1,
        type: 'radio',
        label: 'Test label',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2},
          {name: 'three', active: false, value: 3}
        ]
      },
      {
        id: 2,
        type: 'radio',
        label: 'Test label',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 0,
        type: 'radio',
        label: 'Test label',
        options: [
          {name: 'one', active: true, value: 1},
          {name: 'two', active: false, value: 2}
        ]
      },
      {
        id: 0,
        type: 'radio',
        label: 'Test label',
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
  feature;
  formBoxes= [
  ];

  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.selectionService.getItems().subscribe((response: any) => {
      console.log(response);
      this.feature = response;
    });
  }

  saveFormResults(formBox, id) {
    this.formBoxes[id] = formBox;
  }
}
