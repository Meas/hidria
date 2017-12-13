import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-box',
  template: `
    <label for="options">Text</label>
    <select name="options" (change)="onChange($event.target.value)">
      <option disabled>Select option</option>
      <option *ngFor="let obj of localSelect" value="obj.value">{{obj.description}}</option>
    </select>
  `,
  styles: [`
    select {
      width: 100%;
      height: 40px;
      font-size: 15px;
      border: solid 1px $main-border-item;
      background: white;
      text-align-last: center;
    }
    select option {
      text-align: center;
    }
  `]
})
export class SelectBoxComponent implements OnInit {
  localSelect: Array<object>;
  @Input() set select(data: Array<object>) {
    if (data) {
      this.localSelect = _.cloneDeep(data);
    }
  }

  @Output() value: EventEmitter<number> = new EventEmitter();

  @Input() items;
  constructor() { }

  ngOnInit() {
  }

  onChange(value) {
    this.value.emit(value);
  }

}
