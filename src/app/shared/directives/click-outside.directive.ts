import { Directive, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: false // or true if using in standalone
})
export class ClickOutsideDirective implements OnDestroy {
  @Output() appClickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.appClickOutside.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.appClickOutside.complete();
  }
}

// file.component.html
// -------------------
// <div (appClickOutside)="onClickedOutside()">
//   <!-- your content -->
// </div>


// file.component.ts
// -------------------
// onClickedOutside() {
//   console.log('Clicked outside the element!');
// }
