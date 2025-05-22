import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: unknown, limit: number = 20, suffix: string = '...'): string {
    if (typeof value !== 'string') {
      return '';
    }

    return value.length > limit ? value.substring(0, limit) + suffix : value;
  }

}
