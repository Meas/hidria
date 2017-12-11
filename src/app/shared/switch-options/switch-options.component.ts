import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as _ from "lodash"

@Component({
  selector: 'app-switch-options',
  templateUrl: './switch-options.component.html',
  styleUrls: ['./switch-options.component.scss']
})
export class SwitchOptionsComponent implements OnInit {
  localButtons: Array<object>;
  @Input() defaultValue;
  @Input() set buttons(data: Array<object>) {
    if (data) {
      this.localButtons = _.cloneDeep(data);
    }
  }

  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeSelected(button, buttons) {
    this.value.emit(button.value);
    buttons.map(oneButton => {
      if(oneButton == button)
        oneButton.active = true;
      else
        oneButton.active = false;
    });
  }

}
