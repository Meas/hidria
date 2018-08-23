import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { ComparisonService } from '../../services/comparison/comparison.service';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UnsetComparison, ClearComparison} from '../../store/app.actions';
import { clone } from 'lodash';

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

  showGraph = false;
  graph;
  tables;
  comparisonList: any = [];

  @ViewChild('myModal') myModal: ModalComponent;

  @Select(state => state.app.comparison) comparison$: Observable<any>;

  constructor(private comparisonService: ComparisonService,
              private cd: ChangeDetectorRef,
              private store: Store) { }

  ngOnInit() {
    this.getTabs();
    this.getComparisonList();
    this.loading = false;
  }

  getTabs() {
    this.tables = [];
  }

  getComparisonList() {
    console.log('set to undef graph')
    this.graph = undefined;
    this.comparison$.subscribe((comparisonList) => {
      this.comparisonList = comparisonList;
      this.comparisonList.forEach((data, i) => {
        console.log('DT', data)
        if (i > 0) {
          this.graph.ypoints = this.graph.ypoints.concat(data.graph.ypoints);
          this.graph.borderColor = this.graph.borderColor.concat(data.color);
          this.graph.labels = this.graph.labels.concat(data.graph.labels);
        } else {
          this.graph = clone(data.graph);
        }
      });
      console.log('GRAPH COMP', this.graph)
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
    });

    console.log(this.graph);
  }

  onFilterSelected(event) {
    this.filterSelected = event;
  }

  onDeleteFromComparison (index) {
    this.store.dispatch(new UnsetComparison(index)).subscribe((res) => {
      this.getComparisonList();
    });
    this.myModal.visible = false;
  }

  clearAll() {
    this.store.dispatch(new ClearComparison());
    this.myModal.visible = false;
    this.graph = undefined;
  }

  clearAllConfirm() {
    this.myModal.visible = true;
  }
  cancel() {
    this.myModal.visible = false;
  }
}
