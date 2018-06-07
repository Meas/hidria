import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ComparisonService } from '../../services/comparison/comparison.service';
import * as _ from 'lodash';
import {OperatingPointService} from '../../services/operating-point/operating-point.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  loading = true;

  feature: any = {};
  filters = [{id: 0, name: 'Operation'}, {id: 1, name: 'Nominal'}, {id: 2, name: 'Construction'}];
  filterSelected = 0;
  searchTerm: String = '';
  sortBy: String = '';

  graph: any = {};
  tables;
  comparisonList: any = [];

  constructor(private comparisonService: ComparisonService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTabs();
    this.getComparisonList();
    this.loading = false;
  }

  getTabs() {
    this.tables = [];
  }

  getComparisonList() {
    console.log(JSON.parse(localStorage.getItem('comparison')));
    this.comparisonList = JSON.parse(localStorage.getItem('comparison')) !== null ? JSON.parse(localStorage.getItem('comparison')) : [];
    this.comparisonList.forEach((model, i) => {
      if (i === 0) {
        this.tables.push([], [], []);
        model.data.forEach((data, j) => {
            data.data.forEach(obj => {
              this.tables[j].push(obj.name);
            });
        });
      }
    });
    console.log(this.tables);
  }

  onFilterSelected(event) {
    this.filterSelected = event;
  }

  onNameChange(event): void {
    this.searchTerm = event.toLowerCase();
  }
  onSortChange(event): void {
    this.sortBy = event;
  }

  onDeleteFromComparison (id) {
    this.comparisonList = this.comparisonList.filter(model => model.id !== id);
    localStorage.setItem('comparison', JSON.stringify(this.comparisonList));
  }

  clearAll() {
    localStorage.setItem('comparison', JSON.stringify([]));
    this.comparisonList = [];
  }
}
