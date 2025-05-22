import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // HOW TO USE
  // constructor(private storage: StorageService) { }

  // Save user to localStorage
  // this.storage.setLocal('user', { id: 1, name: 'Manish' });
  
  // Retrieve user
  // const user = this.storage.getLocal<{ id: number, name: string }>('user');
  // console.log(user);
  
  // Remove user
  // this.storage.removeLocal('user');

  // ==========================
  
  // Save data to localStorage
  setLocal(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from localStorage
  getLocal<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  // Remove item from localStorage
  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all localStorage
  clearLocal(): void {
    localStorage.clear();
  }

  // Save data to sessionStorage
  setSession(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from sessionStorage
  getSession<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  // Remove item from sessionStorage
  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all sessionStorage
  clearSession(): void {
    sessionStorage.clear();
  }
}
