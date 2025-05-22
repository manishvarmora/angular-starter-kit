import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Save token to localStorage
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  // Check if token exists (logged in)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
