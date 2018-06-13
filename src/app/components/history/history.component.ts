import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general/general.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  items = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.generalService.getHistory().subscribe((response: any) => {
      console.log(response);
      this.items = response;
    });
  }

}
