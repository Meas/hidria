import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = {
    headers: ['Name', 'Email', 'User group', 'Registered', 'Last active'],
    data: [
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      },
      {
        values: ['User 1', 'johndoe@gmail.com', 'Member', '12 hours ago', '10 hours ago']
      }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
