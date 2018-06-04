import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.css']
})
export class AddToProjectComponent implements OnInit {

  localProjects: any;
  elements = [
    {
      id: 1,
      parameter: 'projectName',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Project Name',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      id: 2,
      parameter: 'construction',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Construction',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      id: 3,
      parameter: 'address',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Address',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      id: 4,
      parameter: 'purchaser',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Purchaser',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      id: 5,
      parameter: 'projectant',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Projectant',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    },
    {
      id: 6,
      parameter: 'business',
      order: '',
      tag: 'input',
      type: 'text',
      description: 'Business',
      visibleUI: false,
      visiblePRT: false,
      unit: '',
      required: false,
      max: null,
      min: null,
      defaultOption: null
    }
  ];

  @Input() type: String;
  @Input() card: Object;
  @Input() set projects(data: any) {
    this.fillFormValues();
    this.createForm();
  }
  @Output() cancel: EventEmitter<string> = new EventEmitter();
  @Output() postForm: EventEmitter<any> = new EventEmitter();

  projectForm: FormGroup;


  formValues = {};

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute ) {}

  ngOnInit() {}

  createForm() {
    this.projectForm = this.fb.group({

    });
  }

  onSubmit() {
    this.postForm.emit(this.elements);
    // this.projectForm['submitted'] = true;
    // if (this.projectForm.valid) {
    //   this.onValidForm();
    // }
  }

  onValidForm():  void {
    /* this._notification.getSuccess(`Successfully added to ${this.type}!`); */
    /* console.log(this.projectForm); */
    /* this.cancel.emit('cancel'); */
    this.postForm.emit(this.projectForm);
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
  }

}
