import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private requestCount = 0;

  show() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }
}

// app.component.ts example
// @Component({...})
// export class AppComponent {
//   loading$ = this.loadingService.loading$;

//   constructor(private loadingService: LoadingService) {}
// }

// app.component.html example
// <div *ngIf="loading$ | async" class="loading-spinner">
//   <!-- Your spinner here -->
//   Loading...
// </div>

