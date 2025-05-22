import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log error
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        // Unauthorized - token might be expired or invalid
        // Optionally logout user
        tokenService.removeToken();
        // Optionally redirect to login page or reload
        // window.location.href = '/login';
      }

      // You can handle other status codes here (403, 500, etc.)

      return throwError(() => error);
    })
  );
};

// HOW TO USE
// @NgModule({
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useValue: errorInterceptor, multi: true }
//   ]
// })
// export class AppModule {}