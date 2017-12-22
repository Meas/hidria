import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit {

  @Input() parameter;

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
