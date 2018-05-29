import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss']
})
export class ProjectSelectionComponent implements OnInit {

  showAdding = false;
  showSelection = false;

  @Input() show = true;
  @Input() projects = [];

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() selected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
