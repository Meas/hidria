import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  downloads: any = {};
  addToProject: any = {};
  addToComparison: any = {};
  graphData = [];
  card: Object = {};
  view = 'feature';
  selectedTab: String = 'data-sheet';

  constructor(private operatingPointService: OperatingPointService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getItems();
    this.getProjects();
  }

  getItems(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.operatingPointService.getCustomItems(param.id).subscribe((response: any) => {
        this.feature = response[0];
        this.downloads = response[1];
        this.addToProject = response[2];
        this.addToComparison = response[3];
        this.find(this.feature, 'card', this.card);
        this.zone.run(() => this.cd.markForCheck());
      });
    });
  }

  onPointSelected(event): void {
    this.graphData = [...event];
  }

  onChange(event): void {
    this.operatingPointService.calculate(event).subscribe((response: any) => {
      this.findAndReplace(this.feature, ['parameterList', 'diagrams'], response);
      this.zone.run(() => this.cd.markForCheck());
    });
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
  find(object, type, objectPut) {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.find(object[x], type, objectPut);
        } else if (object[x] === type && x === 'type') {
          objectPut['info'] = object;
        }
      }
    }
  }
  selectTab(newTab) {
    this.selectedTab = newTab;
  }
  getProjects() {
    this.operatingPointService.getProjects().subscribe((response: any) => {
      this.addToProject = response;
    });
  }
  onPostForm(form) {
    console.log(form);
    this.operatingPointService.addToEntity(form, this.view).subscribe((response: any) => {
      console.log(response);
    });
  }
}
