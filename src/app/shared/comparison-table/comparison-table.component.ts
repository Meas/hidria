import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent implements OnInit {

  @Input() headers;
  @Input() modelList;
  @Input() filterSelected;
  @Output() deleteFromComparison: EventEmitter<any> = new EventEmitter();
  @Output() clearAll: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
