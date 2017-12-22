import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent implements OnInit {

  @Input() inputData;
  constructor() {
  }

  ngOnInit() {
  }

}
