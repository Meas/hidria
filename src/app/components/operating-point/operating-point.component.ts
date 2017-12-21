import {Component, Input, OnInit} from '@angular/core';
import {ChooseModelService} from "../../services/chooseModel/chooseModel.service";

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  fanOne = {
    name: 'Some Name',
    description: 'Description',
    image: 'assets/images/fan.png'
  }
  feature = [];

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
