import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-choose-model-table-horizontal',
  templateUrl: './choose-model-table-horizontal.component.html',
  styleUrls: ['./choose-model-table-horizontal.component.scss']
})
export class ChooseModelTableHorizontalComponent implements OnInit {

  @Input() tableData = [];
  @Input() isSelectable = false;
  @Output() onModelSelected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
