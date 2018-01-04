import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-error-message-component',
  providers: [NotificationsService],
  template: `
  <simple-notifications *ngIf="_visible" (onCreate)="created($event)"></simple-notifications>
  `,
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  subscription: any;

  options: {} = {
    timeOut: 1000
  };
  _visible: Boolean = true;

  constructor(private errorMessageService: ErrorMessagesService,
              private _notification: NotificationsService) {}

  ngOnInit() {
    this.subscription = this.errorMessageService.errorEmit.subscribe(error => this.handleError(error));
  }

  handleError(error) {
    console.log('error');
    this._notification.error('lalallaa');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  created(event) {
    console.log(event);
  }
}
