import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-operating-points-inputs',
  templateUrl: './operating-points-inputs.component.html',
  styleUrls: ['./operating-points-inputs.component.scss']
})
export class OperatingPointsInputsComponent implements OnInit {

  showAccordion: false;

  @Input() inputData;
  @Input() set graphDataInput(graphDataInput: any) {
    for (let i = 0; i < graphDataInput.length; i++) {
      this.inputData[i].defaultValue = graphDataInput[i];
    }
    this.changeButtonDisabled = false;
  }
  changeButtonDisabled = false;
  @Output() calculate: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    // for (let i = 0; i < this.inputData.children.length; i++) {
    //   this.graphData.push(this.inputData.children[i]);
    // }
    this.changeButtonDisabled = false;
  }

  inputChanged() {
    this.changeButtonDisabled = false;
  }

  changeClick() {
    this.changeButtonDisabled = false;
    this.calculate.emit(this.inputData);
  }

}
