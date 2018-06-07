import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = {
    headers: ['Name', 'Email', 'User group', 'Registered', 'Last active'],
    data: []
  };
  search = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getItems().subscribe((response: any) => {
      this.users.data = response;
    });
  }

  onDeleteUser(id) {
    this.userService.updateUser({
      pk: id,
      deactivated: false,
    }).subscribe((response: any) => {
      console.log(response);
    });
  }

  onBanUser(id) {
    this.userService.updateUser({
      pk: id,
      active: false,
    }).subscribe((response: any) => {
      console.log(response);
    });
  }
}
