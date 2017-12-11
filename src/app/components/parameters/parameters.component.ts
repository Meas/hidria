import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  sections = [
    {
      'section': 'form',
      'containers': [
        {
          'objName': '1',
          'gridSize': 'col-lg-4',
          'order': '1',
          'children': [
            {
              'order': '1',
              'gridSize': 'col-lg-12',
              'parameter': 'param1',
              'name': 'Category',
              'default': '1',
              'unit': null,
              'type': 'input-number',
              'required': true,
              'minVal': 100,
              'maxVal': 1000
            },
            {
              'order': '2',
              'parameter': 'param2',
              'name': 'Flow',
              'default': '1000',
              'unit': 'm3/h',
              'type': 'input-text',
              'required': false
            },
            {
              'order': '3',
              'parameter': 'param3',
              'name': 'Flow',
              'default': '1000',
              'unit': 'm3/h',
              'type': 'select',
              'required': true,
              'defaultValue': 52,
              'options': [
                {
                  'id': 1,
                  'text': 'Some Text 1',
                  'value': 52,
                },
                {
                  'id': 2,
                  'text': 'Some Text 2',
                  'value': 32,
                }
              ]
            },
            {
              'order': '4',
              'parameter': 'param4',
              'name': 'Flow',
              'default': '1000',
              'unit': 'm3/h',
              'type': 'radio',
              'required': true,
              'defaultValue': 52,
              'options': [
                {
                  'id': 1,
                  'text': 'Some Text',
                  'value': 52,
                },
                {
                  'id': 2,
                  'text': 'Some Text',
                  'value': 32,
                }
              ]
            },
          ]
        },
        {
          'objName': '2',
          'gridSize': 'col-lg-4',
          'order': '2',
          'children': [
            {
              'order': '1',
              'parameter': 'param1',
              'name': 'Category',
              'default': '1',
              'unit': null,
              'type': 'CmB',
              'required': true
            },
            {
              'order': '2',
              'parameter': 'param2',
              'name': 'Flow',
              'default': '1000',
              'unit': 'm3/h',
              'type': 'TxtB',
              'required': false
            },
          ]
        },
        {
          'objName': '3',
          'gridSize': 'col-lg-12',
          'order': '2',
          'children': [
            {
              'order': '1',
              'parameter': 'param1',
              'gridSize': 'col-lg-6',
              'name': 'Reset Default',
              'type': 'Button',
              'action': 'reset-default',
              'Text': 'DEFAULT VALUES'
            },
            {
              'order': '2',
              'parameter': 'param2',
              'gridSize': 'col-lg-6',
              'name': 'Search',
              'type': 'Button',
              'action': 'send-request',
              'Text': 'SEARCH'
            },
          ]
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {}

  saveFormResults(formBox, id) {
    // this.formBoxes[id] = formBox;
  }
}
