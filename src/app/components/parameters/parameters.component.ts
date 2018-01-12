import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  defaultSections;
  feature;
  formBoxes= [
  ];

  paramsForm: FormGroup;

  formValues= {};
  constructor(private selectionService: SelectionService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.selectionService.getItems().subscribe((response: any) => {
      this.feature = response;
      this.defaultSections = _.cloneDeep(this.feature);
      console.log(this.feature);
      this.fillFormValues();
      this.createForm();
    });
  }

  createForm() {
    this.paramsForm = this.fb.group(
      this.formValues
    );
    console.log(this.paramsForm);
  }

  onSubmit() {
    this.paramsForm.submitted = true;
    console.log(this.paramsForm);
  }

  saveFormResults(formBox, id) {
    this.formBoxes[id] = formBox;
  }

  setToDefault(): void {
    this.feature = _.cloneDeep(this.defaultSections);
  }

  getValues(): void {
    console.log(this.feature);
  }

  fillFormValues(): void {
    for (const featureObject of this.feature.featureObjects) {
      for (const parameter of featureObject.parameters) {
        this.formValues[parameter.parameter] = ['', Validators.required ];
        /* this.formValues[parameter.parameter] = {
          'id': parameter.id,
          'min': parameter.min,
          'max': parameter.max,
          'defaultOption': parameter.defaultOption,
          'required': parameter.required,
          'value': parameter.defaultOption
        }; */
      }
    }
    console.log(this.formValues);
  }
}
