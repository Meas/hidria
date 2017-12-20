import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tableData;
  selectedTable;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  	setTimeout(function() {
  		document.getElementById('tab0').click();
  	});
  }

  selectTable(tabId, tableName) {
  	this.selectedTable=tableName;
  	var tabs =  document.getElementsByClassName('tab');
  	for (var i = 0; i < tabs.length; i++) {
  	    (tabs[i].id == tabId) ? tabs[i].classList.add('active') : tabs[i].classList.remove('active');
  	}
  }
  routeTo(link) {
  	if(link)
  		this.router.navigate([link]);
  }

}
