import {Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, NgZone, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {ChartServiceService} from '../../services/chart-service/chart-service.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {

  @Input() tableData;
  hovered: string;
  chartSubscription: Subscription;
  selectedTable;
  selectedTab = 'tab0';
  constructor(private router: Router,
              private chartService: ChartServiceService,
              private zone: NgZone,
              private cd: ChangeDetectorRef) {
    this.chartSubscription = this.chartService.fanSelectSource$.subscribe((x) => {
      this.hovered = x;
      this.zone.run(() => this.cd.markForCheck());
    });
  }

  ngOnInit() {
    const tabs: any = (_.filter(this.tableData.children, function(obj) {
      return obj.type === 'tabs';
    }));
    // this.selectedTable = (tabs[0].children[0].selectTable);
  }

  selectTable(tabId, tableName) {
    this.selectedTable = tableName;
    this.selectedTab  = tabId;
  }
  routeTo(link) {
    if (link) {this.router.navigate([link]); }
  }

  ngOnDestroy() {
    this.chartSubscription.unsubscribe();
  }
}
