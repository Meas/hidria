import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChartServiceService {
  fanSelectSource$: Subject<string> = new Subject();
  constructor() { }

  changeFanSelect(event: string) {
    if (event !== undefined) {
      this.fanSelectSource$.next(event);
    }
  }
}
