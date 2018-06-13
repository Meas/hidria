import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { generateUrlEncodedData, setStorageData } from './helpers/helper';
import { CustomNotificationsService } from './services/notifications/notifications.service';
import { SearchByCodeService } from './services/search-by-code/search-by-code.service';
import {UserService} from './services/user/user.service';
import {HelperService} from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  measure = 'metric';
  loggedIn = false;
  isOpenedSearchByCode = false;
  selectedLanguage = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService,
              private searchByCodeService: SearchByCodeService,
              private userService: UserService,
              private helper: HelperService,
              private notification: CustomNotificationsService) {
    this.loggedIn = authService.isLoggedIn();
    translate.use(this.selectedLanguage);
    console.log(this.selectedLanguage);
    router.events.subscribe((val) => this.isOpenedSearchByCode = false);
    this.authService.getUser(this.helper.getUserId()).subscribe((response: any) => {
      this.measure = response.metricSystem;
    });
  }

  onChangeMetrics(event): void {
    this.userService.updateMetricSystem(event).subscribe((response: any) => {
      console.log(response);
      this.measure = event;
    });
  }

  onChangeLanguage(event) {
    this.selectedLanguage = event;
    localStorage.setItem('lang', event);
    this.translate.use(event);
  }

  searchByCode(event) {
    if (event.status && event.value !== '') {
      this.searchByCodeService.search(event.value).subscribe((response: any) => {
        if (response.length !== 0) {
          this.router.navigate([`/choose-model/${response[0].PK}`]);
        } else {
          this.notification.message('warn', 'Info', 'There are no items for searched code');
        }
      });
    }
    this.isOpenedSearchByCode = !this.isOpenedSearchByCode;
  }
}
