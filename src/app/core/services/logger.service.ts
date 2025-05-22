import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // HOW TO USE IN COMPONENT
  // constructor(private logger: LoggerService) {}

  // ngOnInit() {
  //   this.logger.log('Component initialized');
  //   this.logger.warn('This is a warning');
  //   this.logger.error('Something went wrong');
  // }
  private isLoggingEnabled = isDevMode(); // Only log in development mode

  log(message: string, ...optionalParams: any[]): void {
    if (this.isLoggingEnabled) {
      console.log(`[LOG] ${new Date().toISOString()}: ${message}`, ...optionalParams);
    }
  }

  info(message: string, ...optionalParams: any[]): void {
    if (this.isLoggingEnabled) {
      console.info(`[INFO] ${new Date().toISOString()}: ${message}`, ...optionalParams);
    }
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (this.isLoggingEnabled) {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, ...optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]): void {
    if (this.isLoggingEnabled) {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, ...optionalParams);
    }
  }
}
