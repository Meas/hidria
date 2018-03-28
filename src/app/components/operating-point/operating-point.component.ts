import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import * as _ from 'lodash';
import {MyProjectsService} from '../../services/my-projects/my-projects.service';

@Component({
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
  inputData = [];

  id;

  constructor(private operatingPointService: OperatingPointService,
              private projectService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getId((id) => {
      this.id = id;
      this.getCard(id);
      this.getGraph(id);
      // this.getCharts(id);
      this.getLinks(id);
      this.getInputs(id);
      this.getTable(id);
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
  postCharts(id, data): void {
    const calcData = {
      staticPressure: 12,
      airFlow: 12,
      rpm: 12,
      power: 12,
      dynamicPressure: 12
    }

    data.forEach((o) => {
      switch (o.name) {
        case 'Power (W)':
          calcData.power = o.value;
          break;
        case 'Dynamic Pressure (Pa)':
          calcData.dynamicPressure = o.value;
          break;
        case 'Air flow  (m3/h)':
          calcData.airFlow = o.value;
          break;
        case 'Static Pressure (Pa)':
          calcData.airFlow = o.value;
          break;
        case 'Speed (1/min)':
          calcData.rpm = o.value;
          break;
        default:
          console.log('not el');
      }
    })
    console.log(calcData)
    this.operatingPointService.postCharts(id, calcData).subscribe((response: any) => {
      console.log(response);
      this.graphs = response;
    });
  }
  getInputs(id): void {
    this.operatingPointService.getInputs(id).subscribe((response: any) => {
      this.operatingPointInputs = response;
    });
  }
  getLinks(id): void {
    this.operatingPointService.getLinks(id).subscribe((response: any) => {
      // console.log(response);
    });
  }
  getTable(id): void {
    this.operatingPointService.getTable(id).subscribe((response: any) => {
      this.tables = response;
    });
  }
  getCalculate(id, data): void {
    console.log(data)
    data = {
      staticPressure: Math.round(data[0].defaultValue),
      airFlow: Math.round(data[1].defaultValue)
      // staticPressure: 0,
      // airFlow: 0
    }
    console.log(data)
    this.operatingPointService.getCalculate(id, data).subscribe((response: any) => {
      this.tables = response;
      this.postCharts(this.id, this.tables[2].data);
    });
  }

  onPointSelected(event): void {
    // this.graphData = [...event];
    this.inputData = [...event];
  }

  onChange(event): void {
    // this.operatingPointService.calculate(event).subscribe((response: any) => {
    //   this.findAndReplace(this.feature, ['parameterList', 'diagrams'], response);
    // });
    this.getCalculate(this.id, event);
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
    // console.log(form);
    const data = {
      projectId: 0,
      userId: 0,
      modelId: 0,
      positionNumber: 'string',
      items: 0,
      projectName: 'string',
      construction: 'string',
      address: 'string',
      purchaser: 'string',
      projectant: 'string',
      business: 'string',
      accessories: [
        {
          accessoryId: 0,
          items: 0
        }
      ]
    }
    this.projectService.createProject(data).subscribe((response: any) => {
      console.log(response);
    });
  }
}
