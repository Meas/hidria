import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	console.log('args:'+args)
    return args[1] === 0 ? value : value.filter(item => item[args[0]] === args[1]);
  }

}
