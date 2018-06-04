import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fan-info',
  templateUrl: './fan-info.component.html',
  styleUrls: ['./fan-info.component.scss']
})
export class FanInfoComponent {
  @Input() item;
  @Input() price = false;
}
