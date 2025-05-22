import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

const cache = new Map<string, Observable<HttpEvent<any>>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);
  if (cachedResponse) {
    // Return cached response observable
    return cachedResponse;
  }

  // Make the request and cache the response
  const request$ = next(req).pipe(
    shareReplay(1),
    tap({
      error: () => cache.delete(req.urlWithParams) // Remove cache on error
    })
  );

  cache.set(req.urlWithParams, request$);
  return request$;
};
