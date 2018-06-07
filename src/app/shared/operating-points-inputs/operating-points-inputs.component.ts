import {Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  changeButtonDisabled = true;
  @Output() calculate: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    // for (let i = 0; i < this.inputData.children.length; i++) {
    //   this.graphData.push(this.inputData.children[i]);
    // }
    this.changeButtonDisabled = true;
  }

  inputChanged() {
    this.changeButtonDisabled = false;
  }

  changeClick() {
    this.changeButtonDisabled = true;
    this.calculate.emit(this.inputData);
  }

}
