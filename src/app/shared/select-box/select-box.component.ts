import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-box',
  template: `
    <label for="options">Text</label>
    <select name="options">
      <option>Select option</option>
      <option value="1">One</option>
      <option value="2">Two</option>
    </select>
  `,
  styles: [`
    select {
      width: 100%;
      height: 40px;
      font-size: 15px;
      border: solid 1px $main-border-item;
      background: white;
      text-align-last: center;
    }
    select option {
      text-align: center;
    }
  `]
})
export class SelectBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
