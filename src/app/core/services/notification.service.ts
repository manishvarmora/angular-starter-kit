import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  // HOW TO USE IN .ts
  // constructor(private notify: NotificationService) {}

  // saveData() {
  //   this.notify.success('Data saved successfully!');
  // }

  show(message: string, type: 'success' | 'error' | 'info' | 'warn' = 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snack-${type}`], // define these in styles.scss
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warn(message: string): void {
    this.show(message, 'warn');
  }
}
