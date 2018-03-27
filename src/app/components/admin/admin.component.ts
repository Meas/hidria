import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  slidingEl;

  constructor() { }

  ngAfterViewInit() {
    this.slidingEl = document.getElementById('sliding-el');
  }


  moveSlider(btn) {
    switch (btn) {
      case 'yes':
        this.slidingEl.style.left = '0';
        break;
      case 'no':
        this.slidingEl.style.left = '100px';
        break;
      default:
        this.slidingEl.style.left = '0';
    }
  }

}
