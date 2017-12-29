import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import * as _ from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  feature: any = {};
  graphData = [];
  selectedTab: String = 'data-sheet';

  constructor(private operatingPointService: OperatingPointService,
              private zone: NgZone,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.operatingPointService.getItems().subscribe((response: any) => {
      this.feature = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }

  onPointSelected(event): void {
    this.graphData = [...event];
  }

  onChange(event): void {
    this.operatingPointService.changeParameterList(event).subscribe((response: any) => {
      this.findAndReplace(this.feature, 'parameterList', response);
      this.zone.run(() => this.cd.markForCheck());
    });
  }

    findAndReplace(object, value, replaceValue) {
      for (const x in object) {
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
  selectTab(newTab) {
    this.selectedTab = newTab;
  }
}
