import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  // add more user fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch user profile from backend API
  fetchUserProfile(): Observable<User> {
    return this.http.get<User>('/api/user/profile').pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  // Get cached user data
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // Update user info example
  updateUserProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>('/api/user/profile', data).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  // Clear user info (e.g. on logout)
  clearUser() {
    this.userSubject.next(null);
  }
}


// HOW TO USE IN .ts

// constructor(private userService: UserService) { }

// // Subscribe to user changes
// this.userService.user$.subscribe(user => {
//   console.log('Current user:', user);
// });

// // Fetch user profile on app start or after login
// this.userService.fetchUserProfile().subscribe();

// // Update user profile
// this.userService.updateUserProfile({ name: 'Manish' }).subscribe(updatedUser => {
//   console.log('User updated:', updatedUser);
// });

// // Clear user on logout
// this.userService.clearUser();