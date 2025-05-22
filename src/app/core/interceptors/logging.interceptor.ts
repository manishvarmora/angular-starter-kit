import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const started = Date.now();

  console.log(`➡️ [Request] ${req.method} ${req.urlWithParams}`, req);

  return next(req).pipe(
    tap({
      next: event => {
        const elapsed = Date.now() - started;
        console.log(`✅ [Response] ${req.method} ${req.urlWithParams} (${elapsed} ms)`, event);
      },
      error: error => {
        const elapsed = Date.now() - started;
        console.error(`❌ [Error] ${req.method} ${req.urlWithParams} (${elapsed} ms)`, error);
      }
    })
  );
};
