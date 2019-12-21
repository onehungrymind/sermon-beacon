import { Component, OnInit } from '@angular/core';
import { MediaTypesFacade, SpeakersFacade } from '@sb/core-state';
import { Observable } from 'rxjs';
import { MediaType, Speaker } from '@sb/core-data';

@Component({
  selector: 'sb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  mediaTypes$: Observable<MediaType[]> = this.mediaTypeFacade.allMediaTypes$;
  actionEnabled: boolean;
  speakerColumns = [
    { columnDef: 'name', title: 'Name' },
    { columnDef: 'church_name', title: 'Church' },
    { columnDef: 'position', title: 'Position' },
  ];

  constructor(private speakersFacade: SpeakersFacade, private mediaTypeFacade: MediaTypesFacade) { }

  ngOnInit() {
    this.speakersFacade.loadAll();
  }
}
