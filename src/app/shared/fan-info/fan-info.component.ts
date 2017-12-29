import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fan-info',
  templateUrl: './fan-info.component.html',
  styleUrls: ['./fan-info.component.css']
})
export class FanInfoComponent implements OnInit {
  @Input() fanInfo;
  constructor() { }

  ngOnInit() {
  }

}
