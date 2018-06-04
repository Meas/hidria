import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.scss']
})
export class BodySectionComponent implements OnInit {

  @Input() title: string;
  @Input() addParentId: string;
  @Input() parentId: string;
  @Input() parentName: string;
  @Input() items: Array<{}>;
  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  @Output() filterSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectFunction(item) {
    item.parentId = this.addParentId;
    item.parentName = this.title;
    this.selectItem.emit(item);
  }
}
