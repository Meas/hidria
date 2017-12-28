import {Component, Input, OnInit} from '@angular/core';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  feature: any = {};
  graphData = [];

  constructor(private operatingPointService: OperatingPointService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.operatingPointService.getItems().subscribe((response: any) => {
      this.feature = response;
    });
  }

  onPointSelected(event): void {
    this.graphData = [...event];
  }

  onChange(event): void {
    this.operatingPointService.changeParameterList(event).subscribe((response: any) => {
      this.findAndReplace(this.feature, 'parameterList', response);
    });
  }

    findAndReplace(object, value, replaceValue) {
      for (let x in object) {
        if (object.hasOwnProperty(x)) {
          if (typeof object[x] === 'object') {
            this.findAndReplace(object[x], value, replaceValue);
          }
          if (object[x] === value && x === 'type') {
            object['children'] = replaceValue['children'];
          }
        }
      }
    }
}
