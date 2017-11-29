import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() filters;
  @Input() activeFilter = 'all';
  @Output() filterSelected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
