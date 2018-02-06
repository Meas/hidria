import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  measure = 'm';
  loggedIn = false;
  selectedLanguage = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

  constructor(private authService: AuthService, private translate: TranslateService) {
    this.loggedIn = authService.isLoggedIn();
    translate.use(this.selectedLanguage);
  }

  onChangeMetrics(event): void {
    this.measure = event;
  }

  onChangeLanguage(event) {
    this.selectedLanguage = event;
    localStorage.setItem('lang', event);
    this.translate.use(event);
  }
}
