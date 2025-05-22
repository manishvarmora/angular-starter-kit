import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: unknown, search: string): string {
    if (typeof value !== 'string' || !search) {
      return value as string;
    }

    const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
    const regex = new RegExp(escapedSearch, 'gi');

    return value.replace(regex, match => `<mark>${match}</mark>`);
  }

}
