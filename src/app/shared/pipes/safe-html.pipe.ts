import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown): SafeHtml {
    if (typeof value !== 'string') {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
