import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.css']
})
export class FormBoxComponent implements OnInit {

  @Input() isFirstChild = false;

  constructor() { }

  ngOnInit() {
  }

}
