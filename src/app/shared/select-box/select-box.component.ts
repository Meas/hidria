import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-box',
  template: `
    <label for="options">Text</label>
    <select name="options">
      <option></option>
      <option value="">One</option>
    </select>
  `,
  styles: [`
    select {
      width: 100%;
      height: 35px;
      font-size: 15px;
      border: none;
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
