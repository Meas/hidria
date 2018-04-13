import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { generateUrlEncodedData, setStorageData } from './helpers/helper';
import {CustomNotificationsService} from './services/notifications/notifications.service';
import {SearchByCodeService} from './services/search-by-code/search-by-code.service';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  measure = 'm';
  loggedIn = false;
  isOpenedSearchByCode = false;
  selectedLanguage = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService,
              private searchByCodeService: SearchByCodeService,
              private notification: CustomNotificationsService,
              angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    this.loggedIn = authService.isLoggedIn();
    translate.use(this.selectedLanguage);
    console.log(this.selectedLanguage);
    router.events.subscribe((val) => this.isOpenedSearchByCode = false);
  }

  onChangeMetrics(event): void {
    this.measure = event;
  }

  onChangeLanguage(event) {
    this.selectedLanguage = event;
    localStorage.setItem('lang', event);
    this.translate.use(event);
  }

  searchByCode(event) {
    if (event.status && event.value !== '') {
      this.searchByCodeService.search(event).subscribe((response: any) => {
        console.log(response)
        this.router.navigate([`/choose-model/1`]);
      });
    }
    this.isOpenedSearchByCode = !this.isOpenedSearchByCode;
  }
}
