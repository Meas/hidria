import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-operating-points-inputs',
  templateUrl: './operating-points-inputs.component.html',
  styleUrls: ['./operating-points-inputs.component.scss']
})
export class OperatingPointsInputsComponent implements OnInit {

  @Input() inputData;
  @Input() set graphDataInput(graphData: any) {

   this.graphData = graphData;
   this.changeButtonDisabled = false;

  };
  graphData;
  changeButtonDisabled=true;
  
  constructor() {
  }

  ngOnInit() {
  	for(let i=0; i < this.inputData.children.length; i++)
  		this.graphData.push(this.inputData.children[i].default);
  	this.changeButtonDisabled=true;
  }

  inputChanged() {
  	this.changeButtonDisabled = false;
  }

  changeClick() {
  	this.changeButtonDisabled = true;
  }

}
