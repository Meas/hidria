import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.css']
})
export class BodySectionComponent implements OnInit {

  @Input() title: string;
  @Input() items: Array<{}>;

  constructor() { }

  ngOnInit() {
  }

}
