import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args[1] === 0 ? value : value.filter(item => item[args[0]] === args[1]);
  }
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any[]) {
    if (args[0]) {
      return value.data.filter(function (el: any) {
        return el[args[1]].toLowerCase().indexOf(args[0].toLowerCase()) > -1;
      });
    }
    return value;
  }
}
