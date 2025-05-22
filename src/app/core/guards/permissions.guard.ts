// permissions.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get required permissions from route data
  const requiredPermissions: string[] = route.data?.['permissions'] || [];

  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (!authService.hasPermissions(requiredPermissions)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
