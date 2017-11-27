import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-switch-options',
  templateUrl: './switch-options.component.html',
  styleUrls: ['./switch-options.component.css']
})
export class SwitchOptionsComponent implements OnInit {
  @Input() buttons: Array<object>

  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  durp(button, buttons) {
  	console.log(button)
  	button.active = true;
  }

}
