import { Component, Input } from '@angular/core';

@Component({
  selector: 'sb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() links;
}
