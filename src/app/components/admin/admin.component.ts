import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {IMultiSelectOption, IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import {TranslateService} from '@ngx-translate/core';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';

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
    admin: null
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
          description: 'No'
        },
        {
          id: 1,
          selection: true,
          description: 'Yes'
        }
      ],
      type: 'price'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'No'
        },
        {
          id: 1,
          selection: true,
          description: 'Yes'
        }
      ],
      type: 'comparison'
    },
    {
      options: [
        {
          id: 0,
          selection: false,
          description: 'No'
        },
        {
          id: 1,
          selection: true,
          description: 'Yes'
        }
      ],
      type: 'admin'
    }
  ];

  constructor(private authService: AuthService,
              private activetedRoute: ActivatedRoute,
              private translate: TranslateService,
              private notification: CustomNotificationsService) {
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

}
