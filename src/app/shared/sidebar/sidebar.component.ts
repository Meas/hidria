import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  code = '';
  @Input() isLoggedIn = false;
  @Input() isOpenedSearchByCode;

  @Output('toggleSearchByCode') toggleSearchByCode: EventEmitter<{ status: boolean, value: string }> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onSearchByCodeClicked(data = false) {
    this.toggleSearchByCode.emit({ status: data, value: this.code });
    this.code = '';
  }
}
