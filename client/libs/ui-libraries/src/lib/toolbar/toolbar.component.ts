import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { AuthService, BreakpointService } from '@sb/core-data';

@Component({
  selector: 'sb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent {
  isMobile = this.breakpointService.isMobile();
  isLoggedIn$ = this.authService.isAuthenticated$;
  loggedInUser$ = this.authService.getUser$();
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  constructor(
    private authService: AuthService,
    private breakpointService: BreakpointService
  ) {
    this.authService.handleAuthCallback();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
