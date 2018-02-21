import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import * as _ from 'lodash';

const inputProjects = require('../../../assets/json/add-to-projects-form.json');
const inputComparison = require('../../../assets/json/add-to-comparison-form.json');

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.css']
})
export class AddToProjectComponent implements OnInit {

  localProjects: any;
  inputs: any;

  @Input() type: String;
  @Input() card: Object;
  @Input() set projects(data: any) {
    if (this.type === 'project') {
      this.inputs = inputProjects;
    } else if (this.type === 'comparison') {
      this.inputs = inputComparison;
    }
    this.localProjects = _.cloneDeep(data);
    this.fillFormValues();
    this.createForm();
  }
  @Output() cancel: EventEmitter<string> = new EventEmitter();

  paramsForm: FormGroup;

  formValues= {};

  constructor( private fb: FormBuilder, private _notification: CustomNotificationsService,
                private activatedRoute: ActivatedRoute ) {}

  ngOnInit() {}

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

  onValidForm():  void {
    this._notification.getSuccess(`Successfully added to ${this.type}!`);
    console.log(this.paramsForm);
    /* this.cancel.emit('cancel'); */
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
    this.activatedRoute.params.subscribe((param: Params) => {
      this.formValues['modelId'] = [param.id, []];
    });
    this.formValues['userId'] = [localStorage.getItem('id'), []];
    for (const featureObject of this.inputs.children) {
      for (const row of featureObject.children) {
        for (const parameter of row.children) {
          if (parameter.parameter && parameter.tag === 'input') {
            let value;
              value = parameter.defaultOption ? parameter.defaultOption : '';
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
  }

}
