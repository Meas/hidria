import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnInit {

  @Input() buttons;
  @Input() selected;
  @Input() name;

  @Output() select: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
