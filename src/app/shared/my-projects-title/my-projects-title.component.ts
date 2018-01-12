import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-my-projects-title',
  templateUrl: './my-projects-title.component.html',
  styleUrls: ['./my-projects-title.component.scss']
})
export class MyProjectsTitleComponent implements OnInit {

  @Input() project;

  constructor() {
  }

  ngOnInit() {
  }
}
