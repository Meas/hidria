import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import { remove, find } from 'lodash';
import { MyProjectsService } from '../../services/my-projects/my-projects.service';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { randomColor } from '../../helpers/helper';
import { Store } from '@ngxs/store';
import { SetComparison } from '../../store/app.actions';

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

  graphData;
  graphs = [];
  secondLabel = '';

  tables = [];
  card = {};
  view = 'feature';
  selectedTab = 0;
  inputData = [];
  links = [];

  calculateLoading = true;
  graphLoading = true;

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
    { id: 1 },
    { id: 2 },
    { id: 4 },
    { id: 8 }
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

  compArr = [];

  constructor(private operatingPointService: OperatingPointService,
              private projectService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private notification: CustomNotificationsService,
              private activatedRoute: ActivatedRoute,
              private translate: TranslateService,
              private store: Store) {
    this.operationPointId = +localStorage.getItem('operation-point');
  }

  ngOnInit() {
    this.getId(async (id) => {
      this.id = id;
      this.store.select(state => state.app.comparison).subscribe((res) => {
        this.compArr = res;
      });
      this.getCard(id);
      this.getLegend();
      this.getLinks(id);
      await this.getInputs(id);
      this.getProjects();
      this.loading = false;
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

  async getGraph(id, types): Promise<void> {

    if (types.length > 0) {
      await this.operatingPointService.getGraph(id, types[0], this.getGraphData()).subscribe(async (response: any) => {

        this.graphData = response;

        if (types.length > 1) {
          await this.operatingPointService.getGraph(id, types[1], this.getGraphData()).subscribe((res: any) => {
            this.secondLabel = res.yUnit;
            this.graphData.ypoints = this.graphData.ypoints.concat(res.ypoints);
            this.graphData.borderColor = this.graphData.borderColor.concat(res.borderColor);
          });
        }
      });
    } else {
      this.graphData = undefined;
    }

    this.notification.message('success', 'Graph', 'Graph calculations finished!');
    setTimeout(() => {
      console.log(this.graphData);
      this.graphLoading = false;
    }, 1000);
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

  postCharts(id): void {
    this.operatingPointService.postCharts(id, this.graphOptions).subscribe((response: any) => {
      this.graphs = response;
      this.notification.message('success', 'Sound graph', 'Graph calculations finished!');
    });
  }

  async getInputs(id): Promise<any> {
    await this.operatingPointService.getInputs(id).subscribe(async (response: any) => {
      this.operatingPointInputs = response;
      await this.getCalculate(id, response);
    });
  }

  getLinks(id): void {
    this.operatingPointService.getLinks(id).subscribe((response: any) => {
      this.links = response;
    });
  }

  async getCalculate(id, data): Promise<any> {
    this.calculateLoading = true;
    this.graphOptions.airFlow = Math.ceil(data[0].defaultValue);
    this.graphOptions.staticPressure = Math.ceil(data[1].defaultValue);
    this.graphOptions.altitude = Math.ceil(data[2].defaultValue);

    if (data[3].subparameter[0].defaultValue && data[3].subparameter[1].defaultValue && data[3].subparameter[2].defaultValue) {
      await this.operatingPointService.getDensity({
        temperature: data[3].subparameter[0].defaultValue,
        humidity: data[3].subparameter[1].defaultValue,
        pressure: data[3].subparameter[2].defaultValue
      }).subscribe((response: any) => {
        this.operatingPointInputs[3].defaultValue = response;
        this.graphOptions.density = response;
      });
    } else {
      this.graphOptions.density = data[3].defaultValue;
    }

    await this.getGraph(id, this.types);

    this.operatingPointService.getCalculate(id, this.graphOptions).subscribe((response: any) => {
      this.tables = response;
      if (this.tables.length !== 0) {
        this.graphOptions.rpm = this.tables[0].data[1].value;
      }
      setTimeout(() => {
        this.postCharts(id);
      }, 1000);
    });

    setTimeout(() => {
      this.graphLoading = false;
      this.calculateLoading = false;
    }, 1000);
    return this.graphOptions;
  }

  onPointSelected(event): void {
    if (!event[0]) {
      event[0] = this.inputData[0];
    }
    this.inputData = [...event];
  }

  getProjects() {
    this.operatingPointService.getProjects().subscribe((response: any) => {
      this.projects = response;
    });
  }

  addToComparisonFunc() {
    if (this.compArr.length < 8) {
      this.getId(async (id) => {
        this.operatingPointService.getGraph(id, ['static_pressure'], this.getGraphData()).subscribe((response: any) => {
          console.log('COMP', response)
          const color = randomColor(this.compArr.length);

          response.borderColor = [color];
          this.store.dispatch(new SetComparison([{
            id: this.modelsToCompare.length,
            name: this.card['name'],
            color: color,
            image: this.card['image'],
            data: this.tables,
            graph: response
          }]));
        });
      });
      this.notification.message('success', 'Success', 'Item added to comparison');
    } else {
      this.notification.message('warn', 'Warning', 'You can select only 8 items for comparison');
    }
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
            this.notification.message(response.messageType === 'error' ? 'warn' : response.messageType, response.messageType, res);
          });
        }
      });
    } else {
      this.notification.message('warn', 'Warning', 'Project name is required');
    }
  }

  async onTypeSelected(event) {
    this.graphLoading = true;
    if (find(this.types, (o) => o === event)) {
      this.secondLabel = '';
      remove(this.types, (o) => o === event);
    } else {
      if (this.types.length < this.limitTypes) {
        this.types.push(event);
      }
    }
    await this.getId(async (id) => {
      await this.getGraph(id, this.types);
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
