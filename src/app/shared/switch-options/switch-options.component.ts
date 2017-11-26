import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-switch-options',
  templateUrl: './switch-options.component.html',
  styleUrls: ['./switch-options.component.css']
})
export class SwitchOptionsComponent implements OnInit {
  @Input() buttons
  constructor() { }

  ngOnInit() {
  }

}
