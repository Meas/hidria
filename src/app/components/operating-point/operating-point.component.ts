import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OperatingPointService} from '../../services/operating-point/operating-point.service';
import {remove, find} from 'lodash';
import {MyProjectsService} from '../../services/my-projects/my-projects.service';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  loading = true;
  feature: any = {};
  showProjectSelection = false;
  projects: any = [];
  operatingPointInputs;
  operationPointId = 0;

  graphData: any = {};
  graphs = [];
  secondLabel = '';

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

  legend = [];
  types = [
    'static_pressure'
  ];
  limitTypes = 2;

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
          selection: true,
          description: 'Lw'
        },
        {
          id: 1,
          selection: false,
          description: 'Lp'
        }
      ],
      type: 'typePower'
    },
    {
      options: [
        {
          id: 0,
          selection: true,
          description: 'Octave'
        },
        {
          id: 1,
          selection: false,
          description: '3rd Octave'
        }
      ],
      type: 'typeOctave'
    },
    {
      options: [
        {
          id: 0,
          selection: true,
          description: 'Weighted'
        },
        {
          id: 1,
          selection: false,
          description: 'Unweighted'
        }
      ],
      type: 'typeWeighted'
    }
  ];

  graphOptions = {
    staticPressure: 200,
    airFlow: 400,
    rpm: 1,
    power: 1,
    dynamicPressure: 1,
    altitude: 1,
    density: 1,
    temperature: 1,
    humidity: 1,
    pressure: 1,
    fanPosition: 1,
    distance: 1,
    typePower: true,
    typeOctave: true,
    typeWeighted: true
  };

  constructor(private operatingPointService: OperatingPointService,
              private projectService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private notification: CustomNotificationsService,
              private activatedRoute: ActivatedRoute,
              private translate: TranslateService) {
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
      this.postCharts(id);
      this.loading = false;
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
      console.log(response)
      if (push) {
        this.secondLabel = response.yUnit;
        this.graphData.ypoints = this.graphData.ypoints.concat(response.ypoints);
        this.graphData.borderColor = this.graphData.borderColor.concat(response.borderColor);
      } else {
        this.graphData = response;
      }
    });
    this.notification.message('success', 'Graph', 'Graph calculations finished!');
  }

  getLegend(): void {
    this.operatingPointService.getLegend().subscribe((response: any) => {
      this.legend = response;
    });
  }

  getGraphData() {
    this.inputData.forEach(param => {
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
    });
  }

  postCharts(id): void {
    this.operatingPointService.postCharts(id, this.graphOptions).subscribe((response: any) => {
      this.graphs = response;
      this.notification.message('success', 'Sound graph', 'Graph calculations finished!');
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
      this.links = response;
    });
  }

  getTable(id): void {
    this.operatingPointService.getTable(id).subscribe((response: any) => {
      this.tables = response;
    });
  }

  getCalculate(id, data): void {
    this.graphOptions.airFlow = Math.ceil(data[0].defaultValue);
    this.graphOptions.staticPressure = Math.ceil(data[1].defaultValue);
    this.graphOptions.altitude = Math.ceil(data[2].defaultValue);

    if (data[3].subparameter[0].defaultValue && data[3].subparameter[1].defaultValue && data[3].subparameter[2].defaultValue) {
      this.operatingPointService.getDensity({
        temperature: data[3].subparameter[0].defaultValue,
        humidity: data[3].subparameter[1].defaultValue,
        pressure: data[3].subparameter[2].defaultValue
      }).subscribe((response: any) => {
        this.operatingPointInputs[3].defaultValue = response;
        this.graphOptions.density = response;
      });
    } else {
      this.graphOptions.density = Math.ceil(data[3].defaultValue);
    }

    if (this.tables.length !== 0) {
      this.graphOptions.rpm = Math.ceil(this.tables[0].data[1].value);
    }
    this.operatingPointService.getGraph(id, this.types[0], this.graphOptions).subscribe((response: any) => {

      this.graphData = response;
    });
    this.operatingPointService.getCalculate(id, this.graphOptions).subscribe((response: any) => {
      this.tables = response;
    });
  }

  onPointSelected(event): void {
    this.inputData = [...event];
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

  getProjects() {
    this.operatingPointService.getProjects().subscribe((response: any) => {
      this.projects = response;
    });
  }

  addToComparisonFunc() {
    console.log(this.graphData)
    if (Array.isArray(this.tables)) {
      this.modelsToCompare.push({
        id: this.modelsToCompare.length,
        name: this.card['name'],
        color: 'blue',
        image: this.card['image'],
        data: this.tables,
        graph: this.graphData
      });
    }

    this.notification.message('success', 'Success', 'Item added to comparison');
    localStorage.setItem('comparison', JSON.stringify(this.modelsToCompare));
  }

  addToProject(event) {
    this.showProjectSelection = false;
    if (event) {
      this.projectService.insertModels(event, {
        model: [this.id]
      }).subscribe((response: any) => {
        this.notification.message('success', 'Success', 'Item added to project');
      });
    }
  }

  createProject(event) {
    if (event) {
      this.showProjectSelection = false;
      this.projectService.createProject({
        projectName: event,
        construction: '',
        address: '',
        purchaser: '',
        projectant: '',
        business: ''
      }).subscribe((response: any) => {
        if (response.projectId) {
          this.projectService.insertModels(response.projectId, {
            model: [this.id]
          }).subscribe((res: any) => {
            this.notification.message('success', 'Success', 'Project created and Item added to project');
            this.getProjects();
          });
        } else {
          this.translate.get(response.message).subscribe((res: string) => {
            this.notification.message(response.messageType, response.messageType, res);
          });
        }
      });
    } else {
      this.notification.message('warn', 'Warning', 'Project name is required');
    }
  }

  onTypeSelected(event) {
    if (find(this.types, (o) => o === event)) {
      remove(this.types, (o) => o === event);
    } else {
      if (this.types.length < this.limitTypes) {
        this.types.push(event);
      }
    }
    this.getId((id) => {
      this.types.forEach((type, i) => {
        this.getGraph(id, type, i > 0);
      });
    });
  }

  downloadCard(link) {
    this.getId((id) => {
      this.operatingPointService.generateCard(id).subscribe((response: any) => {
        window.open(response, '_blank');
      });
    });
  }
}
