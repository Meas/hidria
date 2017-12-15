import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from "lodash"

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

  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeSelected(id) {
    this.value.emit(id);
    this.selectedOption = id;
  }

}
