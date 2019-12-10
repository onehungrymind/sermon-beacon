import { Component } from '@angular/core';
import { SermonsFacade } from '@sb/core-state';
import { Sermon } from '@sb/core-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private sermonF: SermonsFacade) { this.sermonF.deleteSermon({title: 'TESTING'} as Sermon) }
}
