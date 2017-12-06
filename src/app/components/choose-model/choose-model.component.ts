import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-choose-model',
  templateUrl: './choose-model.component.html',
  styleUrls: ['./choose-model.component.scss']
})
export class ChooseModelComponent implements OnInit {

  fanOne = {
    name: 'Some Name',
    description: 'Description',
    image: 'assets/images/fan.png'
  }
  constructor() { }

  ngOnInit() {
  }

}
