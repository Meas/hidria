import {Component, OnInit} from '@angular/core';
import {ChooseModelService} from '../../services/chooseModel/chooseModel.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import { isEmpty, assign } from 'lodash';

@Component({
  selector: 'app-choose-model',
  templateUrl: './choose-model.component.html',
  styleUrls: ['./choose-model.component.scss']
})
export class ChooseModelComponent implements OnInit {

  loading = true;

  features: any = {
    card: undefined,
    table: undefined,
    graph: undefined
  };

  selectedTab = 1;
  data = [];
  model;

  constructor(private chooseModelService: ChooseModelService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notifications: CustomNotificationsService) {
    this.data = this.getDataFromParams();

    localStorage.setItem('operation-point', this.data[0].value);
    activatedRoute.params.subscribe((params: Params) => {
      this.model = params['slug'];
    });
  }

  ngOnInit() {
    if (this.model) {
      console.log(this.model, 'select')
      this.getCard();
      this.getTable();
      this.getGraph();
    } else {
      this.chooseModelService.search(this.getDataFromParams()).subscribe((response: any) => {
        console.log(response);
        this.getSearchCard(response);
        this.getSearchTable(response);
        this.getSearchGraph(response);
      });
    }
  }

  postCard(): void {
    const obj = [
      {
        modelCode: 'string'
      }
    ];
    this.chooseModelService.postItems(obj).subscribe((response: any) => {
    });
  }
  getCard(): void {
    this.chooseModelService.getItems(this.model || this.data[0].value, 'card').subscribe((response: any) => {
      this.features.card = response[0];
    });
  }
  getTable(): void {
    this.chooseModelService.getItems(this.model || this.data[0].value, 'table').subscribe((response: any) => {
      console.log(response)

      this.features.table = response.map(obj => {
        obj.data = obj.data.map((el, i) => {
          const t = {};
          el.map((o, j) => {
            if (i === 0) {
              obj.headers[j] = {
                name: obj.headers[j],
                code: o.name
              };
            }
            assign(t, Object.defineProperty({}, o.name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: o.value
            }));
          });
          return t;
        });
        return obj;
      });
    });
  }
  getGraph(): void {
    this.chooseModelService.getGraph(this.model || this.data[0].value).subscribe((response: any) => {
      console.log(response)
      if (response.length !== 0) {
        this.features.graph = response[0];
      }
      // this.notifications.getError({'status': 400, 'statusText': 'No results!'});
    });
    this.loading = false;
  }

  getSearchCard(data) {
    this.chooseModelService.getSearchCard(data).subscribe((response: any) => {
      this.features.card = response[0];
    });
  }
  getSearchTable(data) {
    this.chooseModelService.getSearchTable(data).subscribe((response: any) => {
      this.features.table = response.map(obj => {
        obj.data = obj.data.map((el, i) => {
          const t = {};
          el.map((o, j) => {
            if (i === 0) {
              obj.headers[j] = {
                name: obj.headers[j],
                code: o.name
              };
            }
            assign(t, Object.defineProperty({}, o.name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: o.value
            }));
          });
          return t;
        });
        return obj;
      });
    });
  }
  getSearchGraph(data) {
    this.chooseModelService.getSearchGraph(data).subscribe((response: any) => {
      if (response.length !== 0) {
        console.log(response, 'graph')
        this.features.graph = response[0];
      }
      this.loading = false;
    });
  }

  selectTab(newTab) {
    this.selectedTab = newTab;
  }

  selectModel(event) {
    this.router.navigate([`/choose-model/operating-point/${event}`]);
  }

  getDataFromParams() {
    const tempArray: Array<any> = [];
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (!isEmpty(queryParams)) {
        for (const attribute in queryParams) {
          if (queryParams[attribute]) {
            const tempObject = {
              'name': attribute,
              'value': queryParams[attribute]
            };
            tempArray.push(tempObject);
          }
        }
      } else {
        this.activatedRoute.params.subscribe((param: Params) => {
          tempArray.push({'name': 'ID', 'value': param.slug});
          this.model = param.slug;
        });
      }
    });
    return tempArray;
  }

}
