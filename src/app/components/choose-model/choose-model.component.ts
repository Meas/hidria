import {Component, Input, OnInit} from '@angular/core';
import {ChooseModelService} from '../../services/chooseModel/chooseModel.service';

@Component({
  selector: 'app-choose-model',
  templateUrl: './choose-model.component.html',
  styleUrls: ['./choose-model.component.scss']
})
export class ChooseModelComponent implements OnInit {

  feature: any = [];

  constructor(private chooseModelService: ChooseModelService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.chooseModelService.getItems().subscribe((response: any) => {
      this.feature = response;
    });
  }
}
