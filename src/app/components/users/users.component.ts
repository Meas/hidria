import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {ModalComponent} from '../../shared/modal/modal.component';

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
  userId;
  search = '';

  @ViewChild('myModal') myModal: ModalComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getItems().subscribe((response: any) => {
      this.users.data = response;
    });
  }

  confirmDeleteUser(id) {
    this.userId = id;
    this.myModal.visible = true;
  }
  onDeleteUser() {
    this.userService.deleteUser(this.userId).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
      this.myModal.visible = false;
    });
  }
  cancelDelition() {
    this.userId = null;
    this.myModal.visible = false;
  }
}
