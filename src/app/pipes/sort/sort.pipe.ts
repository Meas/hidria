import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return orderBy(value, [args[0]], [args[1] ? 'asc' : 'desc']);
  }
}

@Pipe({
  name: 'sortModels'
})
export class SortModelsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return orderBy(value, ['name', args[0]], [args[1] ? 'asc' : 'desc']);
  }
}

