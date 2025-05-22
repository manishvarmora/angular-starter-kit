import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: false // set to true if used in standalone components
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText) return;

    this.tooltipElement = this.renderer.createElement('span');
    this.tooltipElement.innerText = this.tooltipText;

    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);

    this.renderer.appendChild(document.body, this.tooltipElement);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    let top = 0, left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - 8;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + 8;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - 8;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + scrollY}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left + scrollX}px`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.destroyTooltip();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange() {
    this.destroyTooltip();
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}




// file.component.html
// -------------------
// <button
//   [appTooltip]="'Delete item'"
//   tooltipPosition="right">
//   🗑 Delete
// </button>


// CSS
// -------------------
// .tooltip {
//   position: absolute;
//   background: #333;
//   color: #fff;
//   padding: 6px 10px;
//   border-radius: 4px;
//   font-size: 12px;
//   pointer-events: none;
//   z-index: 1000;
//   white-space: nowrap;
//   transition: opacity 0.2s ease;
// }

// .tooltip-top::after,
// .tooltip-bottom::after,
// .tooltip-left::after,
// .tooltip-right::after {
//   content: '';
//   position: absolute;
//   border-style: solid;
// }

// .tooltip-top::after {
//   bottom: -5px;
//   left: 50%;
//   margin-left: -5px;
//   border-width: 5px 5px 0 5px;
//   border-color: #333 transparent transparent transparent;
// }

/* Define ::after arrow styles for bottom/left/right as needed */
