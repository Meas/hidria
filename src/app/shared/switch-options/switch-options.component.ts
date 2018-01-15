import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-switch-options',
  templateUrl: './switch-options.component.html',
  styleUrls: ['./switch-options.component.scss']
})
export class SwitchOptionsComponent implements OnInit {
  localButtons: Array<object>;
  selectedOption: number;

  @Input() set defaultOption(data: number) {
    if (data) {
      this.selectedOption = _.cloneDeep(data);
    }
  }
  @Input() set buttons(data: Array<object>) {
    if (data) {
      this.localButtons = _.cloneDeep(data);
    }
  }
  @Input() paramsForm;
  @Input() name;

  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeSelected(id) {
    this.selectedOption = id;
  }

  hasRequiredError() {
    return this.paramsForm.submitted && this.paramsForm.get(this.name).errors && this.paramsForm.get(this.name).errors.required;
  }

}
