import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent {

  @Input() isFirstChild = false;
  @Input() featureObject;
  @Input() paramsForm;

  @Output() formValues: EventEmitter<any> = new EventEmitter();
}
