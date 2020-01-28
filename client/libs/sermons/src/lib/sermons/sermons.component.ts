import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, Sermon, SermonSpeaker, Speaker } from '@sb/core-data';
import { SermonsFacade, SermonSpeakersFacade, SpeakersFacade } from '@sb/core-state';
import { SermonsDialogComponent } from '../sermons-dialog/sermons-dialog.component';

@Component({
  selector: 'sb-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  sermonSpeakers$: Observable<SermonSpeaker[]> = this.sermonSpeakersFacade.allSermonSpeakers$.pipe(
    map((sermonSpeakers: SermonSpeaker[]) => sermonSpeakers.length === 0 ? [{id: 0, sermon: {title: 'No search results found', date: Date.now()}}] as any[] : sermonSpeakers)
  );
  sermonsLoading$: Observable<boolean> = this.sermonFacade.sermonLoading$;
  speakersLoading$: Observable<boolean> = this.speakersFacade.speakerLoading$;
  speakerColumns = [
    { columnDef: 'name', title: 'Name' },
    { columnDef: 'church_name', title: 'Church' },
    { columnDef: 'position', title: 'Position' },
  ];

  constructor(
    private authService: AuthService,
    private sermonFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private sermonSpeakersFacade: SermonSpeakersFacade,
    @Inject(MatDialog) private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sermonFacade.loadSermons();
    this.speakersFacade.loadSpeakers();
    this.sermonSpeakersFacade.loadSermonSpeakers();
  }

  openSermonDialog(sermonSpeaker?: SermonSpeaker) {
    const ref = this.dialog.open(SermonsDialogComponent, {
      minHeight: '400px',
      data: { ...sermonSpeaker.sermon }
    });

    return ref.afterClosed();
  }

  deleteSermon(sermon: Sermon) {
    this.sermonFacade.deleteSermon(sermon);
  }

  //---------------------------------------
  // SPEAKERS
  //---------------------------------------

  createSpeaker(speaker: Speaker) {
    this.speakersFacade.createSpeaker(speaker);
  }

  updateSpeaker(speaker: Speaker) {
    this.speakersFacade.updateSpeaker(speaker);
  }

  deleteSpeaker(speaker: Speaker) {
    this.speakersFacade.deleteSpeaker(speaker);
  }
}
