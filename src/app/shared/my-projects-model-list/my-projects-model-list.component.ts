import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-my-projects-model-list',
  templateUrl: './my-projects-model-list.component.html',
  styleUrls: ['./my-projects-model-list.component.scss']
})
export class MyProjectsModelListComponent implements OnInit {

  @Input() selectedProject;
  constructor() {
  }

  ngOnInit() {
  }
}
