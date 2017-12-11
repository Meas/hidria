import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit {

  @Input() isFirstChild = false;
  @Input() section;

  @Output() formValues: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  saveInputResult(event, id?, type?): void {
    console.log(event, id, type);
  }
}
