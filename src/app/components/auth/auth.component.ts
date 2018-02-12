import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {generateUrlEncodedData, setStorageData} from '../../helpers/helper';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginClicked() {
    this.authService.login(generateUrlEncodedData(this.loginData)).subscribe((response: any) => {
      console.log(response)
      setStorageData(['access_token', 'Username', 'expires_in'], response);
    })
  }

  onRegisterClicked() {
    // console.log(generateUrlEncodedData(this.registerData));
    this.authService.register(this.registerData).subscribe((response: any) => {
      console.log(response)
    })
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
}
