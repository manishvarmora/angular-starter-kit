import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDebounceClick]',
  standalone: false // or true if using standalone component setup
})
export class DebounceClickDirective {
  @Input() debounceTime = 300; // default debounce time in ms
  @Output() debounceClick = new EventEmitter<Event>();

  private timeoutId: any;

  constructor() {}

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.debounceClick.emit(event);
    }, this.debounceTime);
  }
}

// file.component.html
// -------------------
// <button
//   [debounceTime]="500"
//   (debounceClick)="onDebouncedClick()"
//   appDebounceClick>
//   Click Me
// </button>

// file.component.ts
// -------------------
// onDebouncedClick() {
//   console.log('Debounced click triggered');
// }
