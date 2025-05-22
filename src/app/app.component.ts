import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CapitalizePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-starter-kit';
}
