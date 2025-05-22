import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]',
  standalone: false // or true for standalone component usage
})
export class LazyLoadImageDirective implements AfterViewInit, OnDestroy {
  @Input('appLazyLoadImage') src!: string; // image source

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngAfterViewInit(): void {
    if (!this.src) return;

    // Create observer
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadImage();
        this.observer?.unobserve(this.el.nativeElement);
      }
    });

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    img.src = this.src;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}




// file.component.html
// -------------------
// <img
//   [appLazyLoadImage]="'https://example.com/image.jpg'"
//   alt="Lazy Loaded Image"
//   width="400"
// />

// CSS
// img {
//   filter: blur(10px);
//   transition: filter 0.3s;
// }

// img[src] {
//   filter: blur(0);
// }
