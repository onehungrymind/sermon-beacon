import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable, Subject } from 'rxjs';

import { AuthService, Sermon, Speaker } from '@sb/core-data';
import { MediaFacade, SermonsFacade, SermonSpeakersFacade, SpeakersFacade } from '@sb/core-state';
import { SermonsDialogComponent } from '../sermons-dialog/sermons-dialog.component';

@Component({
  selector: 'sb-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnDestroy, OnInit {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;
  sermons$: Observable<Sermon[]> = this.sermonFacade.sermonsWithSpeakers$;
  sermonSpeakers$: Observable<Speaker[]> = this.sermonSpeakersFacade.allSermonSpeakers$;
  sermonsLoading$: Observable<boolean> = this.sermonFacade.sermonLoading$;
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  speakersLoading$: Observable<boolean> = this.speakersFacade.speakerLoading$;
  destroy$ = new Subject();
  speakerColumns = [
    { columnDef: 'name', title: 'Name' },
    { columnDef: 'church_name', title: 'Church' },
    { columnDef: 'position', title: 'Position' },
  ];

  constructor(
    private authService: AuthService,
    private mediaFacade: MediaFacade,
    private sermonFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private sermonSpeakersFacade: SermonSpeakersFacade,
    @Inject(MatDialog) private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.speakersFacade.loadSpeakers();
    this.sermonSpeakersFacade.loadSermonSpeakers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  openSermonDialog(sermon?: Sermon) {
    const ref = this.dialog.open(SermonsDialogComponent, {
      minHeight: '400px',
      data: { ...sermon }
    });

    return ref.afterClosed();
  }

  deleteSermon(sermon: Sermon) {
    this.sermonFacade.deleteSermon(sermon);
    this.mediaFacade.deleteMediaBySermonId(sermon.id);
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

  deletSpeaker(speaker: Speaker) {
    this.speakersFacade.deleteSpeaker(speaker);
  }
}
