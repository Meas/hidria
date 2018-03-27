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

  loading = true;
  feature: any = {};
  downloads: any = {};
  addToProject: any = {};
  addToComparison: any = {};
  operatingPointInputs;
  graphData = [];
  graphs;
  tables = [];
  card: Object = {};
  view = 'feature';
  selectedTab: String = 'data-sheet';

  id;

  constructor(private operatingPointService: OperatingPointService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getId((id) => {
      this.getCard(id);
      this.getGraph(id);
      this.getCharts(id);
      this.getLinks(id);
      this.getInputs(id);
      this.getTable(id);
      this.getCalculate(id);
      this.getProjects();
      this.loading = false;
      setTimeout(() => {
        this.zone.run(() => this.cd.markForCheck());
      }, 2000);
    });
  }

  getId(cb) {
    this.activatedRoute.params.subscribe((param: Params) => {
      cb(param.id);
    });
  }

  getCard(id): void {
    this.operatingPointService.getCard(id).subscribe((response: any) => {
      this.card = response;
    });
  }
  getGraph(id): void {
    this.operatingPointService.getGraph(id).subscribe((response: any) => {
      this.graphData = response;
    });
  }
  getCharts(id): void {
    this.operatingPointService.getCharts(id).subscribe((response: any) => {
      this.graphs = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }
  getInputs(id): void {
    this.operatingPointService.getInputs(id).subscribe((response: any) => {
      this.operatingPointInputs = response;
    });
  }
  getLinks(id): void {
    this.operatingPointService.getLinks(id).subscribe((response: any) => {
      console.log(response);
    });
  }
  getTable(id): void {
    this.operatingPointService.getTable(id).subscribe((response: any) => {
      console.log(response);
      this.tables = response;
    });
  }
  getCalculate(id): void {
    this.operatingPointService.getCalculate(id).subscribe((response: any) => {
      console.log(response);
    });
  }

  onPointSelected(event): void {
    this.graphData = [...event];
  }

  onChange(event): void {
    this.operatingPointService.calculate(event).subscribe((response: any) => {
      this.findAndReplace(this.feature, ['parameterList', 'diagrams'], response);
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
    console.log(newTab)
    this.selectedTab = newTab;
  }
  getProjects() {
    this.operatingPointService.getProjects().subscribe((response: any) => {
      this.addToProject = response;
    });
  }
  onPostForm(form) {
    console.log(form);
    this.operatingPointService.addToEntity(form).subscribe((response: any) => {
      console.log(response);
    });
  }
}
