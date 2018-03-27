import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MainService } from '../main.service';

import { HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class OperatingPointService {

  constructor(private service: MainService, private helper: HelperService) { }

  /**
   * Gets cards
   * @returns {Observable<any>}
   */
  getCard(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/card`);
  }

  /**
   * Gets links
   * @returns {Observable<any>}
   */
  getLinks(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/links`);
  }

  /**
   * Gets inputs
   * @returns {Observable<any>}
   */
  getInputs(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/inputs`);
  }

  /**
   * Gets graph data
   * @returns {Observable<any>}
   */
  getGraph(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/graph`);
  }

  /**
   * Gets table data
   * @returns {Observable<any>}
   */
  getTable(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/table`);
  }

  /**
   * Gets calculate data
   * @returns {Observable<any>}
   */
  getCalculate(id): Observable<any> {
    return this.service.post(`choose-model/operating-point/${id}/calculate`);
  }

  /**
   * Gets carts data
   * @returns {Observable<any>}
   */
  getCharts(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/charts`);
  }

  calculate(event): Observable<any> {
    return this.service.get('choose-model/operating-point/calculate/id');
  }
  getCustomItems(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}`);
  }
  getProjects(): Observable<any> {
    return this.service.get(`users/${this.helper.getUserId()}/projects`);
  }
  addToEntity(form): Observable<any> {
    return this.service.post(`users/${this.helper.getUserId()}/type`, form.value);
  }
}
