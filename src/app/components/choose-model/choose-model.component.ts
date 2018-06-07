import {Component, OnInit} from '@angular/core';
import {ChooseModelService} from '../../services/chooseModel/chooseModel.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import * as _ from 'lodash';

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

  filters = [{id: 0, name: 'Nominal Data'}, {id: 1, name: 'Construction Data'}];
  selectedTab = 0;
  data = [];
  tableTab = 0;
  model = 0;

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
    this.getCard();
    this.getTable();
    this.getGraph();
  }

  postCard(): void {
    const obj = [
      {
        modelCode: 'string'
      }
    ];
    this.chooseModelService.postItems(obj).subscribe((response: any) => {
      console.log(response);
    });
  }
  getCard(): void {
    this.chooseModelService.getItems(this.model || this.data[0].value, 'card').subscribe((response: any) => {
      this.features.card = response[0];
    });
  }
  getTable(): void {
    this.chooseModelService.getItems(this.model || this.data[0].value, 'table').subscribe((response: any) => {
      console.log(response);
      this.features.table = response;
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

  selectTab(newTab) {
    this.selectedTab = newTab;
  }

  selectModel(event) {
    console.log(event);
    this.router.navigate(['/choose-model/operating-point/1']);
  }

  sortColumn() {

  }

  getDataFromParams() {
    const tempArray: Array<any> = [];
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (!_.isEmpty(queryParams)) {
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
        });
      }
    });
    return tempArray;
  }

}
