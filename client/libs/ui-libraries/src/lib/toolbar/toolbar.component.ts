import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { BreakpointService } from '@sb/core-data';

@Component({
  selector: 'sb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent {
  isMobile = this.breakpointService.isMobile();
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  constructor(private breakpointService: BreakpointService) { }
}
