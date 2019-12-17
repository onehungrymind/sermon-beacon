import { Component, OnInit } from '@angular/core';
import { Speaker } from '@sb/core-data';
import { Observable } from 'rxjs';
import { SpeakersFacade } from '@sb/core-state';

@Component({
  selector: 'sb-sermons-details',
  templateUrl: './sermons-details.component.html',
  styleUrls: ['./sermons-details.component.scss']
})
export class SermonsDetailsComponent implements OnInit {
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;

  constructor(private speakersFacade: SpeakersFacade) { }

  ngOnInit() {
    this.speakersFacade.loadAll();
  }

}
