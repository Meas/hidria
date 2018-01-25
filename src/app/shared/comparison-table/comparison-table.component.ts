import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent implements OnInit {

  @Input() tables;
  @Input() filterSelected;

  constructor() { }

  ngOnInit() {
  }

}
