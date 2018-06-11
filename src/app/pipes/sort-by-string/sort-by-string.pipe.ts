import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortByString'
})
export class SortByStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (args) {
      case '': {
        return value;
      }
      case 'name-asc': {
        return orderBy(value, ['name'], ['asc']);
      }
      case 'name-desc': {
        return orderBy(value, ['name'], ['desc']);
      }
      case 'date-asc': {
        return orderBy(value, ['created'], ['asc']);
      }
      case 'date-desc': {
        return orderBy(value, ['created'], ['desc']);
      }
    }
  }

}
