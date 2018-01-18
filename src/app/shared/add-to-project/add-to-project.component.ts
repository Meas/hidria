import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.css']
})
export class AddToProjectComponent implements OnInit {

  @Input() feature: any;

  constructor() { }

  ngOnInit() {
  }

}
