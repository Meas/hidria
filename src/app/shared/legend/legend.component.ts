import {Component, EventEmitter, Input, Output} from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {

  @Input() group;
  @Input() selected;
  @Input() options = [];
  @Input() limit = 1;

  @Output() typeSelected: EventEmitter<{}> = new EventEmitter();
}
