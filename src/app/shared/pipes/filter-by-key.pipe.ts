import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKey',
  pure: false // Set to false if the input data might change over time
})
export class FilterByKeyPipe implements PipeTransform {

  transform(items: any[], key: string, value: any): any[] {
    if (!Array.isArray(items) || !key) {
      return items;
    }

    return items.filter(item => item[key] === value);
  }

}