import { Component, OnInit } from '@angular/core';
import {generateUrlEncodedData, setStorageData} from "../../helpers/helper";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {CustomNotificationsService} from "../../services/notifications/notifications.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

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
    langId: '1',
    industry: '',
    position: '',
    applications: [],
    termsAndConditions: false
  }

  registrationOptions = {
    industry: [],
    position: [],
    applications: []
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
              private notification: CustomNotificationsService) {
    if (authService.isLoggedIn()) {
      router.navigate(['catalogue']);
    }
  }

  ngOnInit() {
    this.getRegisterFields();
  }

  getRegisterFields() {
    this.authService.getRegisterFields().subscribe((response: any) => {
      console.log(response);
      this.registrationOptions = response;
    });
  }

  onLoginClicked() {
    this.authService.login(generateUrlEncodedData(this.loginData)).subscribe((response: any) => {
      console.log(response);
      if (response.hasOwnProperty('access_token')) {
        setStorageData(['access_token', 'username', 'expires_in', 'id'], response);
        this.router.navigate(['catalogue']);
      } else {
        console.log('Error on login happened');
      }
    });
  }

  onRegisterClicked() {
    // console.log(generateUrlEncodedData(this.registerData));
    this.registerData.applications = [this.registerData.applications];
    if (this.registerData.password !== this.registerData.passwordRepeat) {
      this.notification.message('error', 'Error', 'Password not same');
    } else {
      this.authService.register(this.registerData).subscribe((response: any) => {
        console.log(response)
        this.notification.message('warn', 'Warning', response.message);
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

  handleCorrectCaptcha(event) {
    console.log(event);
  }

}
