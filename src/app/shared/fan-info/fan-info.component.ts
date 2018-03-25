import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-fan-info',
  templateUrl: './fan-info.component.html',
  styleUrls: ['./fan-info.component.css']
})
export class FanInfoComponent implements OnInit {
  @Input() fanInfo;

  constructor() {}

  ngOnInit() {}

}
