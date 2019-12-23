import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { BreakpointService } from '@sb/core-data';

@Component({
  selector: 'sb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent {
  title = 'SermonBeacon';
  isMobile = this.breakpointService.isMobile();
  @Input() links: any[];
  @Input() isAdmin: boolean;
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private breakpointService: BreakpointService
  ) { }

  navigateToPath(path: string) {
    this.router.navigate([path]);
    this.sidenav.close();
  }
}
