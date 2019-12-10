import { Component } from '@angular/core';
import { MediaService } from '@sb/core-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = [
    { path: '/', title: 'Sermons' },
    { path: '/manage', title: 'Manage' },
  ];
  
  constructor(private mediaService: MediaService) { 
    this.mediaService.update({ id: '35d2dba4-1855-11ea-8d71-362b9e155667' }).subscribe();
  }
}
