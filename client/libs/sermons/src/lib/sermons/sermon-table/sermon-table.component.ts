import { Component, EventEmitter, Inject, Input, OnChanges, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';

import * as moment from 'moment';

import { Sermon, Speaker } from '@sb/core-data';
import { TableDataSource } from '@sb/material';

@Component({
  selector: 'sb-sermon-table',
  templateUrl: './sermon-table.component.html',
  styleUrls: [ './sermon-table.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SermonTableComponent implements OnChanges {
  @Input() sermons: Sermon[];
  @Input() isLoading: boolean;

  @Output() deleted = new EventEmitter();
  @Output() dialogOpened = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: TableDataSource;
  displayedColumns = ['title', 'subject', 'speakers', 'date', 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];
  sermonColumns = [
    { column: 'title', title: 'Title', cell: (sermon: Sermon) => sermon.title },
    { column: 'subject', title: 'Subject', cell: (sermon: Sermon) => sermon.subject },
    { column: 'speakers', title: 'Speakers', cell: (sermon: Sermon) => this.displaySermonSpeakers(sermon) },
    { column: 'date', title: 'Date', cell: (sermon: Sermon) => moment(sermon.date).format('MMM DD, YYYY') },
  ];

  constructor () { }

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

  private displaySermonSpeakers(sermon: Sermon) {
    // TODO: display only one speaker, if multiple add ellipsis with a tooltip displaying all other speakers.
    return sermon.sermon_speakers
      .map((speaker: Speaker) => speaker.name);
  }
}
