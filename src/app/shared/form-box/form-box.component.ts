import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit {

  @Input() isFirstChild = false;
  @Input() section: {
  	name: string,
  	formFields: Array<{}>
  };


  @Output() emitter: EventEmitter<{}> = new EventEmitter();

/*  results: Observable<{}>;*/
  results: Observable<Array<{}>> = Observable.of([]);
  constructor() {
  	console.log(this.results);
	this.results.subscribe((data) => {
		this.emitter.emit(data)
	})
  }

  ngOnInit() {
  }

	saveInputResult(value, id) {
		/*var a = Array();
		a[id] = {'id': id, 'value': value};*/
		this.results[id] = {'id': id, 'value': value};
		console.log(this.results);
	}


}
