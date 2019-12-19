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
  speaker$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  mediaTypes$: Observable<MediaType[]> = this.mediaTypeFacade.allMediaTypes$;
  speakerColumns = ['name', 'position', 'church', 'actions'];
  mediaColumns = ['name', 'description', 'actions'];
  dynamicColumns = [
    { column: 'name', title: 'Name', cell: (speaker: Speaker) => `${speaker.first_name} ${speaker.last_name}` },
    { column: 'position', title: 'Position', cell: (speaker: Speaker) => speaker.position },
    { column: 'church', title: 'Church', cell: (speaker: Speaker) => speaker.church_name },
  ];
  dynamicMediaColumns = [
    { column: 'name', title: 'Name', cell: (mediaType: MediaType) => mediaType.name },
    { column: 'description', title: 'Description', cell: (mediaType: MediaType) => mediaType.description }
  ];

  constructor(private speakersFacade: SpeakersFacade, private mediaTypeFacade: MediaTypesFacade) { }

  ngOnInit() {
    this.speakersFacade.loadAll();
    this.mediaTypeFacade.loadMediaTypes();
  }
}
