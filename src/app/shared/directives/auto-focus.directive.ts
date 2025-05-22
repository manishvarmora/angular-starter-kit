import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Delay to ensure the element is fully rendered
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }

}

// file.component.html
// -------------------
// <input type="text" appAutoFocus />
