import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-choose-model-table',
  templateUrl: './choose-model-table.component.html',
  styleUrls: ['./choose-model-table.component.scss']
})
export class ChooseModelTableComponent implements OnInit {

  @Input() tableData = [];
  @Input() isSelectable = false;

  constructor() { }

  ngOnInit() {
  }

}
