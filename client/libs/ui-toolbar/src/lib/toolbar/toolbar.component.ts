import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'sb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
  
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
