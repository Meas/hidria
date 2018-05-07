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
    applications: '',
    termsAndConditions: false
  }

  registrationOptions = {
    industries: ['heating', 'ventilation & air-conditioning', 'refrigeration', 'IT & telecom', 'distribution / after-sales', 'other'],
    positions: ['R&D', 'purchasing', 'management', 'other'],
    applications: ['heat pumps', 'condensers', 'condenser units', 'dry coolers', 'chillers', 'evaporators', 'cooling towers', 'process cooling units', 'fan heaters', 'air curtains', 'AHU', 'roof fans', 'ventilation systems', 'exhaust applications', 'data centers', 'other']
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

  constructor(private authService: AuthService, private router: Router, private notifications: CustomNotificationsService) {
    if (authService.isLoggedIn()) {
      router.navigate(['catalogue']);
    }
  }

  ngOnInit() {
  }

  getRegisterFields() {

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
    if (this.registerData.password !== this.registerData.passwordRepeat) {
      console.log('Password not same');
    } else {
      this.authService.register(this.registerData).subscribe((response: any) => {
        console.log(response)
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
