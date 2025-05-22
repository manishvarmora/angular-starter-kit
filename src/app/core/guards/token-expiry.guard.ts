// token-expiry.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenExpiryGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (authService.isTokenExpired()) {
    authService.logout(); // optional
    router.navigate(['/login'], { queryParams: { session: 'expired' } });
    return false;
  }

  return true;
};
