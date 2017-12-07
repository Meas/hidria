import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() measure;
  @Output() changeMetricsClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

}
