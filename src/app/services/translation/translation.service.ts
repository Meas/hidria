import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainService } from '../main.service';

@Injectable()
export class MyTranslationService {

  constructor(private service: MainService, private translationService: MyTranslationService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getTranslations(langId: number): Observable<any> {
    return this.service.get(`translate/${langId}`);
  }
}
