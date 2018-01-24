import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ComparisonService } from '../../services/comparison/comparison.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  feature: any = {};
  filters: any = {};
  filterSelected = 1;
  searchTerm: String = '';
  sortBy: String = '';

  graph: any = {};

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
          console.log(obj);
          this.graph = Object.assign({}, obj);
          console.log('graph', this.graph);
          this.zone.run(() => this.cd.markForCheck());
        }
      })
    });
  }
}
