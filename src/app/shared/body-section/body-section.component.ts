import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.scss']
})
export class BodySectionComponent implements OnInit {

  @Input() title: string;
  @Input() items: Array<{}>;
  @Output() selectItem: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
