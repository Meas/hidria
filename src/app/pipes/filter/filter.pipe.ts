import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';
import { unix } from 'moment';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args[1] === -1 ? value : value.filter(item => item[args[0]] === args[1]);
  }
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any[]) {
    if (args[1]) {
      return value.filter(function (el: any) {
        // return el[cd.code].toString().toLowerCase().indexOf(args[1].toLowerCase()) > -1;
        return !!find(el, function(o) {
          if (o) {
            return o.toString().toLowerCase().indexOf(args[1].toLowerCase()) > -1;
          }
        });
      });
    }
    return value;
  }
}


@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args: any[]) {
    return unix(value).format('DD.MM.YYYY');
  }
}
