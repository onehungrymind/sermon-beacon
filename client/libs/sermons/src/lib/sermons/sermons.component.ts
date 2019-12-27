import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';

import * as moment from 'moment';
import { filter, map, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';

import { Sermon, Speaker } from '@sb/core-data';
import { SermonsDialogComponent } from '../sermons-dialog/sermons-dialog.component';
import { MediaFacade, SermonsFacade, SpeakersFacade } from '@sb/core-state';
import { TableDataSource } from '@sb/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sb-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isAdmin: boolean = this.route.snapshot.data.isAdmin;
  sermonsLoading$: Observable<boolean> = this.sermonFacade.sermonLoading$;
  speakersLoading$: Observable<boolean> = this.speakersFacade.speakerLoading$;
  sermons$: Observable<Sermon[]> = this.sermonFacade.allSermons$;
  speakers$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  dataSource: TableDataSource;
  destroy$ = new Subject();
  displayedColumns = ['title', 'subject', 'speakers', 'date', 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];
  sermonColumns = [
    { column: 'title', title: 'Title', cell: (sermon: Sermon) => sermon.title },
    { column: 'subject', title: 'Subject', cell: (sermon: Sermon) => sermon.subject },
    { column: 'speakers', title: 'Speakers', cell: (sermon: Sermon) => this.displaySermonSpeakers(sermon) },
    { column: 'date', title: 'Date', cell: (sermon: Sermon) => moment(sermon.date).format('MMM DD, YYYY') },
  ];
  speakerColumns = [
    { columnDef: 'name', title: 'Name' },
    { columnDef: 'church_name', title: 'Church' },
    { columnDef: 'position', title: 'Position' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaFacade: MediaFacade,
    private sermonFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    @Inject(MatDialog) private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.speakersFacade.loadSermonSpeakers();
    this.speakersFacade.loadSpeakers();
  }

  ngAfterViewInit() {
    if (this.sort) {
      combineLatest([this.sermons$, this.speakers$]).pipe(
        map(([sermons, speakers]) => this.mapSpeakersToSermons(sermons, speakers)),
        filter((sermons) => !!sermons.length),
        takeUntil(this.destroy$),
      ).subscribe((sermons: Sermon[]) =>
        this.dataSource = new TableDataSource(sermons, this.sort, this.paginator)
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  goToSermonView(sermonId: string) {
    this.router.navigate(['sermon', sermonId]);
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

  private displaySermonSpeakers(sermon: Sermon) {
    // TODO: display only one speaker, if multiple add ellipsis with a tooltip displaying all other speakers.
    return sermon.sermon_speakers
      .map((speaker: Speaker) => speaker.name);
  }

  private mapSpeakersToSermons(sermons: Sermon[], speakers: Speaker[]) {
    return sermons.map((sermon) => {
      const sermon_speakers = speakers.filter((speaker) => sermon.id === speaker.sermon_id);

      return { ...sermon, sermon_speakers };
    });
  }
}
