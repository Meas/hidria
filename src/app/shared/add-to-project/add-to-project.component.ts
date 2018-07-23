import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import { find } from 'lodash';

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.css']
})
export class AddToProjectComponent implements OnInit {

  elements = [
    {
      parameter: 'projectName',
      description: 'TRANSLATE.PROJECTS.PROJECT_NAME',
      required: true,
      defaultOption: null
    },
    {
      parameter: 'construction',
      description: 'TRANSLATE.PROJECTS.CONSTRUCTION',
      required: false,
      defaultOption: null
    },
    {
      parameter: 'address',
      description: 'TRANSLATE.PROJECTS.ADDRESS',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      parameter: 'purchaser',
      description: 'TRANSLATE.PROJECTS.PURCHASER',
      required: false,
      defaultOption: null
    },
    {
      parameter: 'projectant',
      description: 'TRANSLATE.PROJECTS.PROJECTANT',
      required: false,
      defaultOption: null
    },
    {
      parameter: 'business',
      description: 'TRANSLATE.PROJECTS.BUSINESS',
      required: false,
      defaultOption: null
    }
  ];
  projectId;

  @Input() type: String;
  @Input() card: Object;
  @Input() editing: boolean;
  @Input() set projectData(data: any) {
    if (data) {
      for (const obj in data) {
        if (obj) {
          this.elements.forEach(el => {
            if (el.parameter === obj) {
              el.defaultOption = data[obj];
            }
          });
        }
        if (obj === 'id') {
          this.projectId = data[obj];
        }
      }
    }
    this.fillFormValues();
  }
  @Input() set projects(data: any) {}
  @Output() cancel: EventEmitter<string> = new EventEmitter();
  @Output() postForm: EventEmitter<any> = new EventEmitter();

  projectForm: FormGroup;
  preselectedValues = {};
  formValues = {};

  constructor(private fb: FormBuilder, private notificaton: CustomNotificationsService) {
    this.fillFormValues();
  }

  ngOnInit() {}

  createForm() {
    this.projectForm = this.fb.group(
      this.formValues
    );
    this.projectForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  fillFormValues(defaultValues: Boolean = false) {
    for (const parameter of this.elements) {
      let value;
      console.log(defaultValues);
      if (defaultValues) {
        value = parameter.defaultOption || '';
        this.formValues[parameter.parameter] = value;
      } else {
        value = this.preselectedValues[parameter.parameter] || (parameter.defaultOption ? parameter.defaultOption : '');
        this.formValues[parameter.parameter] = [value, []];
        if (parameter.required) {
          this.formValues[parameter.parameter][1].push(Validators.required);
        }
      }
    }
    this.createForm();
  }

  onSubmit() {
    // this.postForm.emit({
    //   data: this.elements,
    //   id: this.projectId
    // });
    this.projectForm['submitted'] = true;
    if (this.projectForm.valid) {
      this.onValidForm();
    } else {
      this.notificaton.message('error', 'Error', 'Project name is required');
    }
  }

  onValidForm():  void {
    /* this._notification.getSuccess(`Successfully added to ${this.type}!`); */
    /* console.log(this.projectForm); */
    /* this.cancel.emit('cancel'); */
    this.postForm.emit(this.projectForm);
  }

  hasRequiredError() {
    return this.projectForm['submitted'] && this.projectForm.get('projectName').errors && this.projectForm.get('projectName').errors.required;
  }
}
