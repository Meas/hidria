import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit {

  @Input() isFirstChild = false;
  @Input() featureObject;
  @Input() paramsForm;

  @Output() formValues: EventEmitter<any> = new EventEmitter();

  results = Array();

  constructor() {
  }

  ngOnInit() {
  }

  saveInputResult(value, id, type) {
    this.results[id] = {'id': id, 'value': value, 'type': type};
    this.formValues.emit(this.results);

  }

  setSourceOptions(options): Array<number | string> {
    const parsedOptions = [];
    if (options) {
      options.forEach(option => parsedOptions.push(option.value));
    }
    return parsedOptions;
  }

}
