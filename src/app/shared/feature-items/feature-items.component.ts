import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit {

  @Input() parameter;
  @Input() name;
  @Input() paramsForm;

  constructor() { }

  ngOnInit() {
    console.log(this.name);
    console.log(this.paramsForm.get(this.name).errors.required);
  }

  hasRequiredError() {
    return this.paramsForm.submitted && this.paramsForm.get(this.name).errors && this.paramsForm.get(this.name).errors.required;
  }

  setSourceOptions(options): Array<number | string> {
    const parsedOptions = [];
    if (options) {
      options.forEach(option => parsedOptions.push(option.value));
    }
    return parsedOptions;
  }

}
