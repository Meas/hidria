import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() filters;
  @Input() active;
  @Input() allFilter = false;
  @Output() filterSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
