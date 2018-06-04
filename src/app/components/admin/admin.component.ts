import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
  }

  moveSlider(target, btn) {
    switch (btn) {
      case 'yes':
        target.style.left = '0';
        break;
      case 'no':
        target.style.left = '100px';
        break;
      default:
        target.style.left = '0';
    }
  }

}
