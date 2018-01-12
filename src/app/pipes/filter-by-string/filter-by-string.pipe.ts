import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByString'
})
export class FilterByStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args[1] === '' ? value : value.filter(item => item[args[0]].toLowerCase().indexOf(args[1]) !== -1);
  }

}
