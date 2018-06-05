import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import { remove, find } from 'lodash';
import {MyProjectsService} from '../../services/my-projects/my-projects.service';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  loading = true;
  feature: any = {};
  downloads: any = {};
  showProjectSelection = false;
  projects: any = [];
  addToComparison: any = {};
  operatingPointInputs;
  operationPointId = 0;

  graphData: any = {};
  graphs = [];

  tables = [];
  card = {};
  view = 'feature';
  selectedTab = 0;
  inputData = [];
  links = [];

  modelsToCompare = [];
  projectId;

  id;
  sections = {
    main: true,
    data: true,
    sound: true
  };
  fanOption = 0;

  legend = [];
  types = [
    'static_pressure'
  ];

  soundOptions = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 4
    },
    {
      id: 8
    }
  ];

  additionalOptions = [
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'Lw'
        },
        {
          id: 1,
          selection: true,
          description: 'Lp'
        }
      ],
      type: 'typePower'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'Octave'
        },
        {
          id: 1,
          selection: true,
          description: '3rd Octave bend'
        }
      ],
      type: 'typeOctave'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'Weighted'
        },
        {
          id: 1,
          selection: true,
          description: 'Unweighted'
        }
      ],
      type: 'typeWeighted'
    }
  ];
  selected = 0;

  graphOptions = {
    staticPressure: 200,
    airFlow: 400,
    rpm: 100,
    power: 100,
    dynamicPressure: 100,
    altitude: 100,
    density: 100,
    temperature: 100,
    humidity: 100,
    pressure: 100,
    fanPosition: 1,
    distance: 100,
    typePower: true,
    typeOctave: true,
    typeWeighted: true
  };

  constructor(private operatingPointService: OperatingPointService,
              private projectService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private notification: CustomNotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.operationPointId = +localStorage.getItem('operation-point');
  }

  ngOnInit() {
    this.getId((id) => {
      this.id = id;
      this.getCard(id);
      this.getGraph(id, this.types[0]);
      this.getLegend();
      // this.getCharts(id);
      this.getLinks(id);
      this.getInputs(id);
      this.getTable(id);
      this.getProjects();
      this.postCharts(id)
      this.loading = false;
      setTimeout(() => {
        this.zone.run(() => this.cd.markForCheck());
      }, 2000);
    });

    this.modelsToCompare = JSON.parse(localStorage.getItem('comparison')) !== null ? JSON.parse(localStorage.getItem('comparison')) : [];
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
  getGraph(id, type = 'static_pressure', push = false): void {
    this.operatingPointService.getGraph(id, type, this.getGraphData()).subscribe((response: any) => {
      if (push) {
        const tempYPoint = this.graphData.ypoints;
        this.graphData.ypoints = [];
        this.graphData.ypoints.push(tempYPoint);
        this.graphData.ypoints.push(response.ypoints);
      } else {
        this.graphData = response;
      }
    });
  }
  getLegend(): void {
    this.operatingPointService.getLegend().subscribe((response: any) => {
      this.legend = response;
    });
  }
  getGraphData() {
    this.inputData.forEach(param => {
      console.log(param);
      switch (param.name) {
        case 'Q':
          this.graphOptions.staticPressure = param.value;
          break;
        case 'Air flow  (m3/h)':
          this.graphOptions.airFlow = param.value;
          break;
        default:
          console.log('not el');
      }
    });

    return this.graphOptions;
  }

  getCharts(id): void {
    this.operatingPointService.getCharts(id).subscribe((response: any) => {
      this.graphs = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }
  postCharts(id): void {
    this.operatingPointService.postCharts(id, this.graphOptions).subscribe((response: any) => {
      this.graphs = response;
      console.log(this.graphs);
      this.zone.run(() => this.cd.markForCheck());
    });
  }
  getInputs(id): void {
    this.operatingPointService.getInputs(id).subscribe((response: any) => {
      this.operatingPointInputs = response;
      this.getCalculate(id, this.operatingPointInputs);
    });
  }
  getLinks(id): void {
    this.operatingPointService.getLinks(id).subscribe((response: any) => {
      console.log(response);
      this.links = response;
    });
  }
  getTable(id): void {
    this.operatingPointService.getTable(id).subscribe((response: any) => {
      this.tables = response;
    });
  }
  getCalculate(id, data): void {
    console.log(data)
    this.graphOptions.airFlow = data[0].defaultValue;
    this.graphOptions.staticPressure = data[1].defaultValue;
    this.graphOptions.altitude = data[2].defaultValue;
    this.graphOptions.density = data[3].defaultValue;
    this.graphOptions.temperature = data[3].subparameter[0].defaultValue;
    this.graphOptions.humidity = data[3].subparameter[1].defaultValue;
    this.graphOptions.pressure = data[3].subparameter[2].defaultValue;
      // airFlow: Math.round(data[0].defaultValue),
      // staticPressure: Math.round(data[1].defaultValue)
    this.operatingPointService.getGraph(id, this.types[0], this.graphOptions).subscribe((response: any) => {
      this.tables = response;
    });
  }

  onPointSelected(event): void {
    this.inputData = [...event];
    // this.getCalculate(this.id, this.operatingPointInputs);
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
      this.projects = response;
    });
  }
  selectProject(event) {
    this.projectId = event;
  }
  addToComparisonFunc() {
    this.modelsToCompare.push({
      id: this.modelsToCompare.length,
      name: this.card['name'],
      color: 'blue',
      image: this.card['image'],
      data: this.tables
    });

    this.notification.message('success', 'Success', 'Item added to comparison');
    localStorage.setItem('comparison', JSON.stringify(this.modelsToCompare));
  }

  addToProject(event) {
    this.showProjectSelection = false;
    if (this.projectId) {
      this.projectService.insertModels(this.projectId, {
        model: [this.id]
      }).subscribe((response: any) => {
        this.notification.message('success', 'Success', 'Item added to project');
      });
    }
  }

  onTypeSelected(event) {
    if (find(this.types, (o) => o === event)) {
      remove(this.types, (o) => o === event);
    } else {
      if (this.types.length < 1) {
        this.types.push(event);
      }
    }
    this.getId((id) => {
        this.getGraph(id, this.types[0], false);
      // this.types.forEach((type, i) => {
      //   this.getGraph(id, type, i > 0);
      // });
    });
  }

  downloadCard(link) {
    window.open(link, '_blank');
  }
}
