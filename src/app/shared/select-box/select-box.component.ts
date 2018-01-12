import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-box',
  template: `
  <div [formGroup]="paramsForm">
    <select name="options" (change)="onChange($event.target.value)"
    [formControlName]="name">
      <option disabled value="">Select option</option>
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
    //this.paramsForm.get('param_Category').setValue(this.localSelect[0].value);
  /* this.paramsForm.get(this.name).setValue(this.localSelect[0].value);
  console.log(this.paramsForm.get('param_Category').value); */
  }

  onChange(value) {
    this.value.emit(value);
  }

}
