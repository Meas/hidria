import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

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

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log(event.srcElement !== 'img')
    // this.showSearchByCode(true)
  }

  onSearchByCode() {
    this.searchByCode.emit(this.code);
    this.showSearchByCode(false);
  }
  showSearchByCode(body) {
    if (body) {
      this.showSBC = false;
    } else {
      this.showSBC = !this.showSBC;
    }
  }
}
