import { Component } from '@angular/core';

import { AuthService } from '@sb/core-data';

@Component({
  selector: 'sb-callback',
  template: '',
  styles: ['']
})
export class CallbackComponent {
  constructor(private authService: AuthService) {
    authService.handleAuthCallback();
  }
}
