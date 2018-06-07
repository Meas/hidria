import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  editData = {
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
    price: true,
    factor: null,
    comparison: true,
    admin: true
  };

  registrationOptions = {
    industry: [],
    position: [],
    applications: []
  };


  additionalOptions = [
    {
      options: [
        {
          id: 0,
          selection: true,
          description: 'Yes'
        },
        {
          id: 1,
          selection: false,
          description: 'No'
        }
      ],
      type: 'price'
    },
    {
      options: [
        {
          id: 0,
          selection: true,
          description: 'Yes'
        },
        {
          id: 1,
          selection: false,
          description: 'No'
        }
      ],
      type: 'comparison'
    },
    {
      options: [
        {
          id: 0,
          selection: true,
          description: 'Yes'
        },
        {
          id: 1,
          selection: false,
          description: 'No'
        }
      ],
      type: 'admin'
    }
  ];

  adminOptions = {
    price: false,
    comparison: false,
    admin: false
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getRegisterFields();
  }

  getRegisterFields() {
    this.authService.getRegisterFields().subscribe((response: any) => {
      console.log(response);
      this.registrationOptions = response;
    });
  }


}
