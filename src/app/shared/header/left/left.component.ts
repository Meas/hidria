import {Component, OnInit,} from '@angular/core';

@Component({
  selector: 'app-left',
  template: `
    <ul class="nav-links left">
      <li class="nav-link"><a class="link-left" href="a">STATISTICS</a></li>
      <li class="nav-link"><a class="link-left" href="b">USER</a></li>
    </ul>
  `,
  styles: [``]
})
export class LeftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
