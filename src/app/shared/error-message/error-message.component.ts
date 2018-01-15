import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-error-message-component',
  template: `
  <simple-notifications [options]="options"></simple-notifications>
  `,
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  pluginSubscription: Subscription;
  redirectSubscription: Subscription;

  options: {} = {
    timeOut: 3000
  };

  constructor(private errorMessageService: ErrorMessagesService,
              private _notification: NotificationsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.errorMessageService.errorEmit.subscribe(error => this.handleError(error));
    this.pluginSubscription = this._notification.emitter.subscribe(event => {
      if (event.add === false) {
        this.handleClose();
      }
    });
  }

  handleError(error) {
    this._notification.remove();
    this._notification.error('An error occurred!', error.statusText);
  }

  handleClose() {
    if (this.router.url.indexOf('choose-model')) {
      this.redirectSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.zone.run(() => this.router.navigate(['parameter'], { queryParams: params }));
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pluginSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}
