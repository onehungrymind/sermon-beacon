import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-portal';

  links = [
    { path: '/', title: 'Search' },
    { path: '/sermons', title: 'Sermons' },
    { path: '/management', title: 'Manage' },
  ];
  
}
