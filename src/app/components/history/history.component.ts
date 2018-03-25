import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  items = [
    {
      title: 'Hidria',
      date: '2018-1-1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Dicta eos ex illum itaque laboriosam maiores, minima nostrum, odio praesentium qui sequi,
      suscipit ut vel voluptatem voluptatum! Ea molestiae reiciendis unde`,
      version: '1.1.2',
      changes: ['feature 1', 'feature 2', 'bugfix 1']
    },
    {
      title: 'Hidria',
      date: '2018-1-1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Dicta eos ex illum itaque laboriosam maiores, minima nostrum, odio praesentium qui sequi,
      suscipit ut vel voluptatem voluptatum! Ea molestiae reiciendis unde`,
      version: '1.2.1',
      changes: ['feature 1', 'feature 2', 'feature 3', 'bugfix 1']
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
