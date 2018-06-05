import {Component, EventEmitter, Input, Output} from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {

  @Input() options = [];
  @Input() types = [];
  @Input() limit = 1;

  @Output() typeSelected: EventEmitter<string> = new EventEmitter();

  isActiveType(code) {
    return !!find(this.types, (o) => o === code);
  }
}
