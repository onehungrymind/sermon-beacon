import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = [
    { path: '/', title: 'Sermons' },
    { path: '/manage', title: 'Manage' }
  ];

  constructor() {}
}
