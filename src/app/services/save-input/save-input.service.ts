import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SaveInputService {

  saveInputEmit: EventEmitter<string> = new EventEmitter();
  constructor() { }

  saveInput(input) {
    console.log(input);
    this.saveInputEmit.emit(input);
  }

}
