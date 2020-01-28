import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { TableDataSource } from '@sb/material';
import { Sermon, SermonSpeaker } from '@sb/core-data';

@Component({
  selector: 'sb-sermon-table',
  templateUrl: './sermon-table.component.html',
  styleUrls: [ './sermon-table.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SermonTableComponent implements OnChanges {
  @Input() sermons: SermonSpeaker[];
  @Input() isAuthenticated: boolean;
  @Input() isLoading: boolean;

  @Output() deleted = new EventEmitter();
  @Output() dialogOpened = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: TableDataSource;
  displayedColumns = ['title', 'subject', 'speakers', 'date'];
  adminColumns = [...this.displayedColumns, 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];
  sermonColumns = [
    { column: 'title', title: 'Title', cell: (sermonSpeaker: SermonSpeaker) => sermonSpeaker.sermon.title },
    { column: 'subject', title: 'Subject', cell: (sermonSpeaker: SermonSpeaker) => sermonSpeaker.sermon.subject },
    { column: 'speakers', title: 'Speakers', cell: (sermonSpeaker: SermonSpeaker) => sermonSpeaker.sermon.sermon_speakers },
    { column: 'date', title: 'Date', cell: (sermonSpeaker: SermonSpeaker) => moment(sermonSpeaker.sermon.date).format('MMM DD, YYYY') },
  ];

  constructor (private router: Router) { }

  ngOnChanges() {
    if (this.sort) {
      this.dataSource = new TableDataSource(this.sermons, this.sort, this.paginator);
    }
  }

  deleteSermon(sermon: Sermon) {
    this.deleted.emit(sermon);
  }

  openSermonDialog(sermon?: Sermon) {
    this.dialogOpened.emit(sermon);
  }

  viewSermon(sermonId: string) {
    this.router.navigate(['sermon', sermonId]);
  }
}
