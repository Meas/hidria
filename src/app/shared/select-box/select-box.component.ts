import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-box',
  template: `
  <div [formGroup]="paramsForm">
    <div *ngIf="hasRequiredError()" class="error-input">*Field is required</div>
    <select (change)="onChange($event.target.value)"
    [formControlName]="name">
      <option value="">Select option</option>
      <option *ngFor="let obj of localSelect" [value]="obj.value">{{ obj.description }}</option>
    </select>
  </div>
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
  selectedOption: Number;


  @Input() set defaultOption(data: number) {
    if (data) {
      this.selectedOption = _.cloneDeep(data);
    }
  }
  @Input() set select(data: Array<object>) {
    if (data) {
      this.localSelect = _.cloneDeep(data);
    }
  }

  @Output() value: EventEmitter<number> = new EventEmitter();
  @Input() items;
  @Input() paramsForm;
  @Input() name;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(value) {
    this.value.emit(value);
  }

  hasRequiredError() {
    return this.paramsForm.submitted && this.paramsForm.get(this.name).errors && this.paramsForm.get(this.name).errors.required;
  }

}
