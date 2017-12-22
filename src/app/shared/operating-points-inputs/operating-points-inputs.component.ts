import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-operating-points-inputs',
  templateUrl: './operating-points-inputs.component.html',
  styleUrls: ['./operating-points-inputs.component.scss']
})
export class OperatingPointsInputsComponent implements OnInit {

  @Input() inputData;
  @Input() graphData;
  
  constructor() {
  }

  ngOnInit() {
  }

}
