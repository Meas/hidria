import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {IMultiSelectOption, IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import {TranslateService} from '@ngx-translate/core';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';
import {UserService} from '../../services/user/user.service';

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
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'h-btn btn-default btn-block',
    dynamicTitleMaxItems: 1
  };
  optionsModel: number[];
  myOptions: IMultiSelectOption[];

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
      this.getUser(params.id);
    });
  }

  ngOnInit() {
    this.getRegisterFields();
  }

  getRegisterFields() {
    this.authService.getRegisterFields().subscribe((response: any) => {
      console.log(response);
      this.registrationOptions = response;
      this.myOptions = this.registrationOptions.applications;
    });
  }

  getUser(id) {
    this.authService.getUser(id).subscribe((response: any) => {
      console.log(response);
      this.editData = response;
      this.optionsModel = response.applications;
    });
  }

  onChange() {
    console.log(this.optionsModel);
    this.editData.applications = this.optionsModel;
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
      this.authService.changePassword(this.changePasswordData).subscribe((response: any) => {
        console.log(response);
        this.notification.message('success', 'Success', response.message);
      });
    } else {
      this.notification.message('warn', 'Warning', 'New password does not match with repeated password');
    }
  }
}
