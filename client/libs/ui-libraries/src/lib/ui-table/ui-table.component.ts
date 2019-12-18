import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Subject } from 'rxjs';

import { MediaType, Speaker } from '@sb/core-data';
import { TableDataSource } from '@sb/material';

@Component({
  selector: 'sb-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})

export class UiTableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() speakers?: Speaker[];
  @Input() mediaTypes?: MediaType[];
  @Input() tableColumns;
  @Input() mediaColumns;
  @Input() dynamicColumns;
  @Output() deleted = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: TableDataSource;
  destroy$ = new Subject();
  spacerColumns = ['create-action', 'space1', 'space2'];

  constructor() { }

  ngOnInit() {
    if (this.speakers) {
      this.spacerColumns.push('space3');
    }
  }

  ngOnChanges() {
    if (this.sort && this.speakers) {
      this.dataSource = new TableDataSource(this.speakers, this.sort, this.paginator);
    }
    if (this.sort && this.mediaTypes) {
      this.dataSource = new TableDataSource(this.mediaTypes, this.sort, this.paginator);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
