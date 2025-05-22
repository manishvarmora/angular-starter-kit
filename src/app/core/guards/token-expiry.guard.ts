import { CanActivateFn } from '@angular/router';

export const tokenExpiryGuard: CanActivateFn = (route, state) => {
  return true;
};
