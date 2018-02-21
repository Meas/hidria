import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomNotificationsService {

  errorEmit: EventEmitter<string> = new EventEmitter();
  successEmit: EventEmitter<string> = new EventEmitter();
  customEmit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  getError(error) {
    if (error.status === 400) {
      this.errorEmit.emit(error);
    }
  }
  getSuccess(message) {
    this.successEmit.emit(message);
  }

  notificationByType(notification) {
    this.customEmit.emit(notification);
  }
}
