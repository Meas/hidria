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
    this.userService.deleteUser(id).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
    });
  }

  onBanUser(id) {
    this.userService.banUser(id).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
    });
  }

  onActivateUser(id) {
    this.userService.activateUser(id).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
    });
  }
}
