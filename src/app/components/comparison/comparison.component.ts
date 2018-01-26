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

  feature: any = {};
  filters: any = {};
  filterSelected = 1;
  searchTerm: String = '';
  sortBy: String = '';

  graph: any = {};
  tables: any = {};

  constructor(private comparisonService: ComparisonService,
              private zone: NgZone,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.comparisonService.getItems().subscribe((response: any) => {
      this.feature = response[0];
      this.filters = response[0].featureObjects[0];
      this.graph = response[1];
      this.tables = response[2];
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
    this.comparisonService.getOneComparison(event.id).subscribe((response: any) => {
      response.map(obj => {
        if (obj.FeatureName === 'graph') {
          this.graph = Object.assign({}, obj);
        } else if (obj.FeatureName === 'table') {
          this.tables = Object.assign({}, obj);
        }
        this.zone.run(() => this.cd.markForCheck());
      });
    });
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
        self.removeFromTable(id, self.tables);
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
  removeFromTable(id, object) {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.removeFromTable(id, object[x]);
        } else if (object[x] === 'tab' && x === 'type') {
          object.children = object.children.filter(child => {
            return (child.type === 'header' || child.id !== id);
          });
        }
      }
    }
    this.zone.run(() => this.cd.markForCheck());
  }
  removeFromGraph(id, object) {
    let indexToRemove;
    const tempGraph = _.cloneDeep(object);
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
