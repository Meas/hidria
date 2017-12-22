import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class='loading'>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
      <div class='loading__square'></div>
    </div>
  `,
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
