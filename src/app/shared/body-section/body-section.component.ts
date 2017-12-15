import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.scss']
})
export class BodySectionComponent implements OnInit {

  @Input() title: string;
  @Input() addParentSlug: string;
  @Input() parentSlug: string;
  @Input() parentDescription: string;
  @Input() items: Array<{}>;
  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  @Output() filterSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectFunction(item) {
  	item.parentSlug = this.addParentSlug;
  	item.parentDescription = this.title;
  	this.selectItem.emit(item)
  }
}
