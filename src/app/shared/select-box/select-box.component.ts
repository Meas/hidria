import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-box',
  template: `
    <label for="options">Text</label>
    <select name="options">
      <option>Select option</option>
      <option *ngFor="let obj of items" value="obj.value">{{obj.name}}</option>
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
  @Input() items;
  constructor() { }

  ngOnInit() {
  }

}
