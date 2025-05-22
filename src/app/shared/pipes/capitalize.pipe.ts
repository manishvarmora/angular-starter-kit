import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, mode: 'first' | 'all' = 'first'): string {
    if (!value) return '';

    if (mode === 'all') {
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
