import { Component, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SermonTableDataSource } from './sermon-table-datasource';
import { Sermon } from '@sb/core-data';

@Component({
  selector: 'material-sermon-table',
  templateUrl: './sermon-table.component.html',
  styleUrls: ['./sermon-table.component.scss']
})
export class SermonTableComponent implements OnChanges {
  @Input() sermonData;
  @Output() deleted = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: SermonTableDataSource;
  primary = 'primary';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subject', 'speakers', 'date', 'actions'];
  spacerColumns = ['create-action', 'space1', 'space2', 'space3', 'space4'];

  dynamicColumns = [
    { column: 'title', title: 'Title', cell: (sermon: Sermon) => `${sermon.title}` },
    { column: 'subject', title: 'Subject', cell: (sermon: Sermon) => `${sermon.subject}` },
    { column: 'speakers', title: 'Speakers', cell: (sermon: Sermon) => `${sermon.sermon_speakers}` },
    { column: 'date', title: 'Date', cell: (sermon: Sermon) => `${sermon.date}` },
  ];

  ngOnChanges() {
    if (this.sort && this.sermonData) {
      this.dataSource = new SermonTableDataSource(this.sermonData, this.sort, this.paginator);
    }


  }
}
