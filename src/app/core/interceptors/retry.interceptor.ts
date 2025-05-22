import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { retryWhen, mergeMap, delay, take } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retryWhen(errors =>
      errors.pipe(
        mergeMap((error, index) => {
          const maxRetries = 3;
          const retryDelay = 1000; // in ms
          if (index < maxRetries && isRetryable(error)) {
            return of(error).pipe(delay(retryDelay));
          }
          return throwError(() => error);
        }),
        take(3)
      )
    )
  );
};

// Only retry for network/server errors (status 0 or 5xx)
function isRetryable(error: any): boolean {
  return error.status === 0 || (error.status >= 500 && error.status < 600);
}
