import { Component, OnInit } from '@angular/core';
import {generateUrlEncodedData} from '../../helpers/helper';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordData = {
    newPassword: '',
    uuid: '',
    langId: 1
  };

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: CustomNotificationsService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.changePasswordData.uuid = params.uuid;
    });
  }

  ngOnInit() {
  }

  onChangePasswordClicked() {
    this.authService.resetPass(this.changePasswordData).subscribe((response: any) => {
      console.log(response);
      this.notification.message('success', 'Success', response.message);
      this.router.navigate(['auth']);
    });
  }
}
