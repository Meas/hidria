import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { generateUrlEncodedData, setStorageData } from './helpers/helper';
import {CustomNotificationsService} from "./services/notifications/notifications.service";
import {NotificationComponent} from "angular2-notifications";

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

  modalLogin = true;
  modalRegister = false;
  modalChangePassword = false;
  modalResetPassword = false;

  loginData = {
    grant_type: 'password',
    userName: '',
    password: ''
  }

  registerData = {
    firstName: '',
    lastName: '',
    password: '',
    passwordRepeat: '',
    email: '',
    country: '',
    company: '',
    address: '',
    telephone: '',
    langId: '1'
  }

  changePasswordData = {
    oldPassword: '',
    newPassword: '',
    mewPasswordConfirm: '',
    email: ''
  }

  restartPasswordData = {
    email: '',
  }

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService,
              private notification: CustomNotificationsService) {
    /* authService.isLoggedIn() ? router.navigate(['catalogue']) : console.log('loged in'); */
    this.loggedIn = authService.isLoggedIn();
    translate.use(this.selectedLanguage);
  }

  onLoginClicked() {
    this.authService.login(generateUrlEncodedData(this.loginData)).subscribe((response: any) => {
      if (!response.hasOwnProperty('error')) {
        setStorageData(['access_token', 'username', 'expires_in', 'id'], response);
        this.router.navigate(['catalogue']);
      } else {
        console.log('Error on login happened');
        // this.notification.notificationByType({
        //
        // })
      }
    });
  }

  onRegisterClicked() {
    // console.log(generateUrlEncodedData(this.registerData));
    if (this.registerData.password !== this.registerData.passwordRepeat) {
      console.log('Password not same');
    } else {
      this.authService.register(this.registerData).subscribe((response: any) => {
        console.log(response)
        // this.notification.notificationByType({
        //
        // })
      });
    }
  }

  onChangePasswordClicked() {
    this.authService.changePassword(generateUrlEncodedData(this.changePasswordData)).subscribe((response: any) => {
      console.log(response)
    })
  }

  onResetPasswordClicked() {
    this.authService.resetPassword(generateUrlEncodedData(this.restartPasswordData)).subscribe((response: any) => {
      console.log(response)
    })
  }

  goTo(modal) {
    this.modalLogin = false;
    this.modalRegister = false;
    this.modalChangePassword = false;
    this.modalResetPassword = false;

    if (modal === 'register') {
      this.modalRegister = true;
    } else if (modal === 'resetPassword') {
      this.modalResetPassword = true;
    } else if (modal === 'login') {
      this.modalLogin = true;
    }
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
