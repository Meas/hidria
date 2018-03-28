import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ComparisonService } from '../../services/comparison/comparison.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  loading = true;

  feature: any = {};
  filters: any = [];
  filterSelected = 1;
  searchTerm: String = '';
  sortBy: String = '';

  graph: any = {};
  headers: any = [];
  modelList: any = [];
  comparisonList: any = [];

  constructor(private comparisonService: ComparisonService,
              private zone: NgZone,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getItems();
    this.getTabs();
    this.getComparisonList();
    this.loading = false;
  }

  getTabs() {
    this.comparisonService.getTabs().subscribe((response: any) => {
      console.log(response);
      this.headers = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }

  getComparisonList() {
    this.modelList = JSON.parse(localStorage.getItem('comparison'));
    // this.comparisonService.getComparisonList(1).subscribe((response: any) => {
    //   console.log(response);
    //   this.comparisonList = response;
    //   this.getModelList(response[0].id);
    //   this.getGraph(response[0].id);
    // });
  }

  getModelList(comparisonId = 1) {
    this.comparisonService.getModelList(comparisonId).subscribe((response: any) => {
      console.log(response);
      this.modelList = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }

  getGraph(comparisonId = 1) {
    this.comparisonService.getGraph(comparisonId).subscribe((response: any) => {
      console.log(response);
      this.graph = response;
      this.zone.run(() => this.cd.markForCheck());
    });
    this.loading = false;
  }

  getItems() {
    this.comparisonService.getItems().subscribe((response: any) => {
      console.log(response);
      this.feature = response[0];
      /* this.filters = response[0].featureObjects[0]; */
      /* this.graph = response[1]; */
      /* this.tables = response[2]; */
      this.zone.run(() => this.cd.markForCheck());
    });
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

  onSelectComparison(event) {
    this.getModelList(event);
    this.getGraph(event);
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
        self.removeFromGraph(id, self.graph);
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
    this.modelList = this.modelList.filter(model => model.id !== id);
    this.zone.run(() => this.cd.markForCheck());
  }
  removeFromGraph(id, object) {
    let indexToRemove;
    const tempGraph: any = _.cloneDeep(object);
    tempGraph.ids = object.ids.filter((value, index) => {
      if (value === id) {
        indexToRemove = index;
        return false;
      }
      return true;
    });
    tempGraph.yPoints = object.yPoints.filter((value, index) => {
      return index !== indexToRemove;
    });
    tempGraph.labels = object.labels.filter((value, index) => {
      return index !== indexToRemove;
    });
    tempGraph.borderColor = object.borderColor.filter((value, index) => {
      return index !== indexToRemove;
    });
    tempGraph.links = object.links.filter((value, index) => {
      return index !== indexToRemove;
    });
    this.graph = Object.assign({}, tempGraph);
    this.zone.run(() => this.cd.markForCheck());
  }
}
