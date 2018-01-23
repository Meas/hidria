import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorMessagesService {

  errorEmit: EventEmitter<string> = new EventEmitter();
  successEmit: EventEmitter<string> = new EventEmitter();
  constructor() { }

  getError(error) {
    if (error.status === 400) {
      this.errorEmit.emit(error);
    }
  }
  getSuccess(message) {
    this.successEmit.emit(message);
  }



}
