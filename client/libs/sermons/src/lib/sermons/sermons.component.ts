import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import * as moment from 'moment';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { SermonsFacade, SpeakersFacade } from '@sb/core-state';
import { Sermon, Speaker } from '@sb/core-data';
import { TableDataSource } from '@sb/material';
import { Router } from '@angular/router';

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
  dataSource: TableDataSource;
  destroy$ = new Subject();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subject', 'speakers', 'date', 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];
  dynamicColumns = [
    { column: 'title', title: 'Title', cell: (sermon: Sermon) => sermon.title },
    { column: 'subject', title: 'Subject', cell: (sermon: Sermon) => sermon.subject },
    { column: 'speakers', title: 'Speakers', cell: (sermon: Sermon) => 'FIX API!' },
    { column: 'date', title: 'Date', cell: (sermon: Sermon) => moment(sermon.date).format('MMM DD, YYYY') },
  ];

  constructor(
    private sermonFacade: SermonsFacade,
    private speakerFacade: SpeakersFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.sermonFacade.loadSermons();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sermons$.pipe(
        filter((sermons: Sermon[]) => !!sermons.length),
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

  goToSermonView(sermon) {
    this.router.navigateByUrl(sermon.id);
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
