import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() index: number;
  @Input() item: {
    name: string;
    description: string;
  }

  constructor() { }

  ngOnInit() {
  }

}
