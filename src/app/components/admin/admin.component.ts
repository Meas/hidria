import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {UserService} from '../../services/user/user.service';
import { find } from 'lodash';

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
    price: null,
    factor: null,
    comparison: null,
    admin: null,
    active: null,
    accountDuration: null
  };

  changePasswordData = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    langId: 1
  };

  registrationOptions = {
    industry: [],
    position: [],
    applications: []
  };

  optionsModel: number[];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  additionalOptions = [
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'TRANSLATE.USERS.NO'
        },
        {
          id: 1,
          selection: true,
          description: 'TRANSLATE.USERS.YES'
        }
      ],
      type: 'price',
      text: 'TRANSLATE.USERS.PRICE'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'TRANSLATE.USERS.NO'
        },
        {
          id: 1,
          selection: true,
          description: 'TRANSLATE.USERS.YES'
        }
      ],
      type: 'comparison',
      text: 'TRANSLATE.USERS.COMPARISON'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'TRANSLATE.USERS.NO'
        },
        {
          id: 1,
          selection: true,
          description: 'TRANSLATE.USERS.YES'
        }
      ],
      type: 'admin',
      text: 'TRANSLATE.USERS.ADMIN'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'TRANSLATE.ACTIVE.NO'
        },
        {
          id: 1,
          selection: true,
          description: 'TRANSLATE.ACTIVE.YES'
        }
      ],
      type: 'active',
      text: 'TRANSLATE.USERS.ACTIVE'
    }
  ];
  time = [
    {
      value: 1,
      text: '1 day'
    },
    {
      value: 3,
      text: '3 days'
    },
    {
      value: 6,
      text: '6 days'
    },
    {
      value: 365,
      text: '365 days'
    },
    {
      value: 0,
      text: 'Unlimited'
    }
  ];

  constructor(private authService: AuthService,
              private activetedRoute: ActivatedRoute,
              private translate: TranslateService,
              private notification: CustomNotificationsService,
              private userService: UserService) {
    activetedRoute.params.subscribe((params: Params) => {
      this.getRegisterFields();
      setTimeout(() => {
        this.getUser(params.id);
      }, 1000);
    });
  }

  ngOnInit() {
  }

  getRegisterFields() {
    this.authService.getRegisterFields().subscribe((response: any) => {
      console.log(response);
      this.registrationOptions = response;
    });
  }

  getUser(id) {
    this.authService.getUser(id).subscribe((response: any) => {
      this.editData = response;
      this.optionsModel = this.registrationOptions.applications.filter((app) => {
        return this.editData.applications.includes(app.id) ? app : undefined;
      });
    });
  }

  onChange() {
    console.log(this.optionsModel);
    this.editData.applications = this.optionsModel.map((option: any) => option.id);
  }

  updateUser() {
    console.log(this.editData);
    this.authService.updateUser(this.editData).subscribe((response: any) => {
      this.translate.get(response.message).subscribe((res: string) => {
        this.notification.message(response.messageType, response.messageType, res);
      });
    });
  }

  changePassword() {
    if (this.changePasswordData.newPasswordRepeat === this.changePasswordData.newPassword) {
      this.changePasswordData['email'] = this.editData.email;
      this.authService.changePassword(this.changePasswordData).subscribe((response: any) => {
        console.log(response);
        this.notification.message('success', 'Success', response.message);
      });
    } else {
      this.notification.message('warn', 'Warning', 'New password does not match with repeated password');
    }
  }
}
