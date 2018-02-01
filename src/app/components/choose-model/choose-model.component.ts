import {Component, Input, OnInit} from '@angular/core';
import {ChooseModelService} from '../../services/chooseModel/chooseModel.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-choose-model',
  templateUrl: './choose-model.component.html',
  styleUrls: ['./choose-model.component.scss']
})
export class ChooseModelComponent implements OnInit {

  feature: any = [];

  constructor(private chooseModelService: ChooseModelService, private activatedRoute: ActivatedRoute,
              private notifications: CustomNotificationsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    /* this.chooseModelService.getItems().subscribe((response: any) => {
      this.feature = response;
    }); */
    const data = this.getDataFromParams();
    this.chooseModelService.postCustomItems(data).subscribe((response: any) => {
      if (response.featureObjects) {
        this.feature = response;
      } else {
        this.notifications.getError({'status': 400, 'statusText': 'No results!'});
      }
    });
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
