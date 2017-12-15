import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit {

  @Input() isFirstChild = false;
  @Input() featureObject;

  @Output() formValues: EventEmitter<any> = new EventEmitter();

  /*  results: Observable<{}>;*/
  /*results = new Subject<any>;*/
  results = Array();

  constructor() {

    /*this.results.subscribe((data) => {
     console.log(data);
     this.formValues.emit(data)
     });*/
  }

  ngOnInit() {
  }

  saveInputResult(value, id, type) {
    this.results[id] = {'id': id, 'value': value, 'type': type};
    /*console.log(this.results);*/
    /*var a = Array();
     a[id] = {'id': id, 'value': value};*/
    this.formValues.emit(this.results);
    /*results[id] = value;*/
    /*console.log(this.results);*/

  }

  setSourceOptions(options): Array<number | string> {
    const parsedOptions = [];
    if (options) {
      options.forEach(option => parsedOptions.push(option.value));
    }
    return parsedOptions;
  }

}
