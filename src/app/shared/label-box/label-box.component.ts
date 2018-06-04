import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-label-box',
  template: `
    <label class="section-label" *ngIf="parameter.description" for="form-input">
      {{ parameter.description }}
      <span *ngIf="parameter.unit" class="unit">({{ parameter.unit }})</span>
      <span class="tooltip" *ngIf="parameter.tooltip">?<span class="tooltiptext">some text here</span></span>
    </label>
  `,
  styleUrls: ['label-box.component.scss']
})
export class LabelBoxComponent {
  @Input() parameter;
}
