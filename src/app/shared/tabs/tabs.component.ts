import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tableData;
  selectedTable;
  selectedTab='tab0';
  constructor(private router: Router) { }

  ngOnInit() {
  	let tabs: any = (_.filter(this.tableData.children, function(obj) {
  		return obj.type == 'tabs';
  	}));
  	this.selectedTable = (tabs[0].children[0].selectTable);
  }

  selectTable(tabId, tableName) {
  	this.selectedTable=tableName;
  	this.selectedTab=tabId;
  }
  routeTo(link) {
  	if(link)
  		this.router.navigate([link]);
  }
}
