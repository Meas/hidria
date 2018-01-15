import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  preselectedValues = {};

  paramsForm: FormGroup;

  formValues= {};
  constructor(private selectionService: SelectionService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.selectionService.getItems().subscribe((response: any) => {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        if (params) {
          this.preselectedValues = params;
        }
        this.feature = response;
        this.defaultSections = _.cloneDeep(this.feature);
        this.fillFormValues();
        this.createForm();
      });
    });
  }

  createForm() {
    this.paramsForm = this.fb.group(
      this.formValues
    );
  }

  onSubmit() {
    this.paramsForm['submitted'] = true;
    if (this.paramsForm.valid) {
      this.onValidForm();
    }
  }

  saveFormResults(formBox, id) {
    this.formBoxes[id] = formBox;
  }

  setToDefault(): void {
    this.fillFormValues(true);
    this.paramsForm.setValue(this.formValues);
  }

  getValues(): void {
  }

  maxValue(max) {
    return (input: FormControl) => {
      return input.value <= max ? null : {max: true};
    };
  }

  minValue(min) {
    return (input: FormControl) => {
      return input.value >= min ? null : {max: true};
    };
  }

  fillFormValues(defaultValues: Boolean = false): void {
    for (const featureObject of this.feature.featureObjects) {
      for (const parameter of featureObject.parameters) {
        let value;
        if (defaultValues) {
          value = parameter.defaultOption ? parameter.defaultOption : '';
          this.formValues[parameter.parameter] = value;
        } else {
          value = this.preselectedValues[parameter.parameter] ?
          this.preselectedValues[parameter.parameter] : (parameter.defaultOption ?
          parameter.defaultOption : '');
          this.formValues[parameter.parameter] = [value, []];
          if (parameter.required) {
            this.formValues[parameter.parameter][1].push(Validators.required);
          }
          if (parameter.max) {
            this.formValues[parameter.parameter][1].push(this.maxValue(parameter.max));
          }
          if (parameter.min) {
            this.formValues[parameter.parameter][1].push(this.minValue(parameter.min));
          }
        }
      }
    }
  }

  onValidForm():  void {
    this.router.navigate(['choose-model'], { queryParams: this.paramsForm.value });
  }
}
