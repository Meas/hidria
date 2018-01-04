import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NotificationsService } from 'angular2-notifications';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-error-message-component',
  template: `
  <simple-notifications [options]="options"></simple-notifications>
  `,
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  subscription: any;

  options: {} = {
    timeOut: 3000
  };

  constructor(private errorMessageService: ErrorMessagesService,
              private _notification: NotificationsService) {}

  ngOnInit() {
    this.subscription = this.errorMessageService.errorEmit.subscribe(error => this.handleError(error));
  }

  handleError(error) {
    this._notification.remove();
    this._notification.error('An error occurred!', error.statusText);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
