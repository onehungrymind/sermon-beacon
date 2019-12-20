import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { Speaker } from '@sb/core-data';
import { SpeakersFacade } from '@sb/core-state';

@Component({
  selector: 'sb-sermons-details',
  templateUrl: './sermons-details.component.html',
  styleUrls: ['./sermons-details.component.scss']
})
export class SermonsDetailsComponent implements OnInit {
  @Input() detailsGroup: FormGroup;
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;

  constructor(private speakersFacade: SpeakersFacade) { }

  ngOnInit() {
    this.speakersFacade.loadSpeakers();
  }

}
