import {Component, Input} from '@angular/core';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  @Input() tableData = [];
  @Input() isSelectable = false;

  sortData(option, orientation) {
    this.tableData['data'] = orderBy(this.tableData['data'], ['name'], [orientation === 1 ? 'asc' : 'desc']);
  }
}
