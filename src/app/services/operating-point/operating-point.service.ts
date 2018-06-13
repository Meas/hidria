import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getGraph(id, type, graphOptions): Observable<any> {
    return this.service.post(`choose-model/operating-point/${id}/graph/${type}`, graphOptions);
  }

  /**
   * Gets graph data
   * @returns {Observable<any>}
   */
  getLegend(): Observable<any> {
    return this.service.get(`choose-model/operating-point/legend`);
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
  getCalculate(id, data): Observable<any> {
    return this.service.post(`choose-model/operating-point/${id}/calculate`, data);
    // {
    //   staticPressure: 0,
    //     airFlow: 0
    // }
  }

  getDensity(data): Observable<any> {
    return this.service.post(`choose-model/operating-point/density`, data);
  }

  /**
   * Gets carts data
   * @returns {Observable<any>}
   */
  getCharts(id): Observable<any> {
    return this.service.get(`choose-model/operating-point/${id}/charts`);
  }
  postCharts(id, data): Observable<any> {
    return this.service.post(`choose-model/operating-point/${id}/charts`, data);
    // {
    //   staticPressure: 0,
    //     airFlow: 0,
    //   rpm: 0,
    //   power: 0,
    //   dynamicPressure: 0
    // }
  }

  generateCard(id): Observable<any> {
    return this.service.post(`choose-model/operating-point/${id}/datasheet/${this.helper.getUserId()}`);
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
