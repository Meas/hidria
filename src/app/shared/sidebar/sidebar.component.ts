import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  code = '';
  showSBC = false;

  @Output('searchByCode') searchByCode: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchByCode() {
    this.searchByCode.emit(this.code);
    this.showSearchByCode();
  }
  showSearchByCode() {
    this.showSBC = !this.showSBC;
  }
}
