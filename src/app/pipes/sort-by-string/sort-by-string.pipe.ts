import { Pipe, PipeTransform } from '@angular/core';

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
        return value.sort(function(a, b) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        });
      }
      case 'name-desc': {
        return value.sort(function(a, b) {
          return a.name.toLowerCase() < b.name.toLowerCase();
        });
      }
      case 'date-asc': {
        return value.sort(function(a, b) {
          return a.created > b.created;
        });
      }
      case 'date-desc': {
        return value.sort(function(a, b) {
          return a.created < b.created;
        });
      }
    }
  }

}
