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
  }

  setSourceOptions(options): Array<number | string> {
    const parsedOptions = [];
    if (options) {
      options.forEach(option => parsedOptions.push(option.value));
    }
    return parsedOptions;
  }

}
