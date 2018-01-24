import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  register = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    country: '',
    company: '',
    address: '',
    telephone: ''
  };

  login = {
    email: '',
    password: ''
  };

  resetPassword = {
    email: ''
  };

  changePassword = {
    passwordOld: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegisterClicked() {
    this.authService.register(this.register).subscribe((response: any) => {
      console.log(response);
    });
  }

  onLoginClicked() {
    this.authService.login(this.login).subscribe((response: any) => {
      console.log(response);
    });
  }

  onResetPasswordClicked() {
    this.authService.resetPassword(this.register).subscribe((response: any) => {
      console.log(response);
    });
  }

  onChangePasswordClicked() {
    this.authService.chanagePassword(this.register).subscribe((response: any) => {
      console.log(response);
    });
  }
}
