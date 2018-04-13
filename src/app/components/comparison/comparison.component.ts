import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ComparisonService } from '../../services/comparison/comparison.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
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
    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'This will delete the item from comparison!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, delete it!'
    }).then(function(e: any){
      if (e.value) {
        self.removeFromTable(id);
        swal({
          title: 'Deleted!',
          text: 'Item has been removed from comparison.',
          type: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
  removeFromTable(id) {
    this.comparisonList = this.comparisonList.filter(model => model.id !== id);
    localStorage.setItem('comparison', JSON.stringify(this.comparisonList))
  }
}
