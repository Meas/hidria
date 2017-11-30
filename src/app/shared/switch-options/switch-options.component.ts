import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-switch-options',
  templateUrl: './switch-options.component.html',
  styleUrls: ['./switch-options.component.scss']
})
export class SwitchOptionsComponent implements OnInit {
  @Input() buttons: Array<object>

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
