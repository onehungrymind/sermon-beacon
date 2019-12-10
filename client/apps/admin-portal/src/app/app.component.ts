import { Component } from '@angular/core';
import { MediaService } from '@sb/core-data';
import { MediaTypes } from 'libs/core-data/src/lib/media/media';

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
  
  constructor(private ms: MediaService) { 
    this.ms.create({ url: 'abc.com', type: MediaTypes.AUDIO}).subscribe();
  }
}
