import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() links;
  
  constructor() { }

  ngOnInit() {
  }

}
