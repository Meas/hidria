import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import * as _ from 'lodash';

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

  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.selectionService.getItems().subscribe((response: any) => {
      if (response['status'] && response['status'] === 400) {
        this.feature = response.error;
        console.log(response);
      } else {
        this.feature = response;
      }
      this.defaultSections = _.cloneDeep(this.feature);
    });
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
}
