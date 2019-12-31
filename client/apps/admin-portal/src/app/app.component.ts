import { Component } from '@angular/core';
import { AuthService } from '@sb/core-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.handleAuthCallback();
  }
}
