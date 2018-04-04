import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class CustomNotificationsService {

  constructor(private notifications: NotificationsService) { }

  message(type = 'info', title = 'Info', content = 'Something happened') {
    this.notifications.create(title, content, type, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true
    });
  }
}
