// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // For example, check if token exists
    return !!localStorage.getItem('token');
  }

  hasRole(requiredRoles: string[]): boolean {
    const userRole = localStorage.getItem('role');
    return requiredRoles.includes(userRole || '');
  }

  getUserPermissions(): string[] {
    const permissions = localStorage.getItem('permissions');
    return permissions ? JSON.parse(permissions) : [];
  }

  hasPermissions(required: string[]): boolean {
    const userPermissions = this.getUserPermissions();
    return required.every(perm => userPermissions.includes(perm));
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const payload = this.decodeJwt(token);
    if (!payload || !payload.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }
}
