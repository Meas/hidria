import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss']
})
export class ProjectSelectionComponent implements OnInit {

  activeTab = '';

  projectId;
  projectName = '';

  @Input() projects = [];

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
