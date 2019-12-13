import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { SermonsFacade, SpeakersFacade } from '@sb/core-state';
import { Sermon, Speaker } from '@sb/core-data';
import { SermonTableDataSource } from '@sb/material';

  @Component({
  selector: 'sb-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Output() deleted = new EventEmitter();
  sermons$: Observable<Sermon[]> = this.sermonFacade.allSermons$;
  speaker$: Observable<Speaker[]> = this.speakerFacade.allSpeakers$;
  dataSource: SermonTableDataSource;
  destroy$ = new Subject();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subject', 'speakers', 'date', 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];
  dynamicColumns = [
    { column: 'title', title: 'Title', cell: (sermon: Sermon) => `${sermon.title}` },
    { column: 'subject', title: 'Subject', cell: (sermon: Sermon) => `${sermon.subject}` },
    { column: 'speakers', title: 'Speakers', cell: (sermon: Sermon) => `${sermon.sermon_speakers}` },
    { column: 'date', title: 'Date', cell: (sermon: Sermon) => `${sermon.date}` },
  ];

  constructor(private sermonFacade: SermonsFacade, private speakerFacade: SpeakersFacade) { }

  ngOnInit() {
    this.sermonFacade.loadSermons();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sermons$.pipe(
        takeUntil(this.destroy$),
      ).subscribe((sermons: Sermon[]) =>
        this.dataSource = new SermonTableDataSource(sermons, this.sort, this.paginator)
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
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
