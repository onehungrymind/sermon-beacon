import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SermonsFacade, SpeakersFacade } from '@sb/core-state';
import { Sermon, Speaker } from '@sb/core-data';
@Component({
  selector: 'sb-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {
  sermons$: Observable<Sermon[]> = this.sermonFacade.allSermons$;
  speaker$: Observable<Speaker[]> = this.speakerFacade.allSpeakers$;

  constructor(private sermonFacade: SermonsFacade, private speakerFacade: SpeakersFacade) { }

  ngOnInit() {
    this.sermonFacade.loadSermons();
    this.speakerFacade.loadAll();
  }

  selectSermon(sermon: Sermon) {
    this.sermonFacade.selectSermon(sermon.id);
  }

  saveSermon(sermon: Sermon) {
    sermon.id ?
      this.sermonFacade.updateSermon(sermon) :
      this.sermonFacade.createSermon(sermon);
  }

  deleteSermon(sermon: Sermon) {
    this.sermonFacade.deleteSermon(sermon);
  }

}
