import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notifications-component',
  template: `
  <simple-notifications [options]="options"></simple-notifications>
  `,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription;
  successSubscription: Subscription;
  pluginSubscription: Subscription;
  redirectSubscription: Subscription;

  options: {} = {
    timeOut: 3000
  };

  constructor(private customNotificationsService: CustomNotificationsService,
              private _notification: NotificationsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.errorSubscription = this.customNotificationsService.errorEmit.subscribe(error => this.handleError(error));
    this.successSubscription = this.customNotificationsService.successEmit.subscribe(success => this.handleSuccess(success));
    this.pluginSubscription = this._notification.emitter.subscribe(event => {
      if (event.add === false && event.notification.type === 'error') {
        this.handleClose();
      }
    });
  }

  handleError(error) {
    this._notification.remove();
    this._notification.error('An error occurred!', error.statusText);
  }

  handleSuccess(success) {
    this._notification.remove();
    this._notification.success(success);
  }

  handleClose() {
    if (this.router.url.indexOf('choose-model') !== -1) {
      this.redirectSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.zone.run(() => this.router.navigate(['parameter'], { queryParams: params }));
      });
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
    this.pluginSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}