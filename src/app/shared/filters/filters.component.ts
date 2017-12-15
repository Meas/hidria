import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() filters;
  @Input() activeFilter;
  @Output() filterSelected: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  totalModels(): number {
    let total = 0;
    this.filters.forEach((item) => {
      total += item.subCategories.length;
    });
    return total;
  }
}
