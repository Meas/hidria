import { Component, OnInit } from '@angular/core';
import { generateUrlEncodedData, setStorageData } from '../../helpers/helper';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {IMultiSelectOption, IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import {TranslateService} from '@ngx-translate/core';

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
  };

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
  };
  thanksMessage = false;

  registrationOptions = {
    industry: [],
    position: [],
    applications: []
  };

  optionsModel: {}[];

  changePasswordData = {
    oldPassword: '',
    newPassword: '',
    mewPasswordConfirm: '',
    email: ''
  };

  restartPasswordData = {
    email: '',
    langId: 1
  };

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  constructor(private authService: AuthService,
              private router: Router,
              private notification: CustomNotificationsService,
              private translate: TranslateService) {
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
      if (!response.hasOwnProperty('error')) {
        setStorageData(['access_token', 'username', 'expires_in', 'id'], response);
        this.router.navigate(['catalogue']);
      } else {
        console.log('Error on login happened');
        this.notification.message('error', 'Error', 'Invalid username or password');
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
        console.log(response);
        this.notification.message('warn', 'Warning', response.message);
        this.thanksMessage = true;
      });
    }
  }

  onResetPasswordClicked() {
    console.log(generateUrlEncodedData(this.restartPasswordData));
    this.authService.resetPassword(generateUrlEncodedData(this.restartPasswordData)).subscribe((response: any) => {
      console.log(response);
      this.translate.get(response.message).subscribe((res: string) => {
        this.notification.message(response.messageType === 'error' ? 'warn' : response.messageType, response.messageType, res);
      });
    });
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

  onChange() {
    this.registerData.applications = this.optionsModel.map((option: any) => option.id);
    console.log(this.registerData.applications);
  }

}
