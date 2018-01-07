import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import * as _ from 'lodash';
import { MyProjectsService } from './../../services/my-projects/my-projects.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  feature: any = {};

  constructor(public myProjectsService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.myProjectsService.getItems().subscribe((response: any) => {
      this.feature = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }


  onChange(event): void {
  }

    findAndReplace(object, types, replaceValues) {
      for (const x in object) {
        if (object.hasOwnProperty(x)) {
          if (typeof object[x] === 'object') {
            this.findAndReplace(object[x], types, replaceValues);
          }
          for (const type of types) {
            if (object[x] === type && x === 'type') {
              for (const replaceValue of replaceValues) {
                if (object[x] === replaceValue['type']) {
                  object['children'] = replaceValue['children'];
                }
              }
            }
          }
        }
      }
    }
}
