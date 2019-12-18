import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { MediaTypesFacade, SpeakersFacade } from '@sb/core-state';
import { MediaType, Speaker, MediaTypesService } from '@sb/core-data';
import { TableDataSource } from '@sb/material';

@Component({
  selector: 'sb-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})

export class UiTableComponent implements AfterViewInit, OnInit, OnDestroy  {
  @Input() tableColumns;
  @Input() mediaColumns;
  @Input() dynamicColumns;
  @Output() deleted = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  speaker$: Observable<Speaker[]> = this.speakerFacade.allSpeakers$;
  mediaTypes$: Observable<MediaType[]> = this.mediaTypeFacade.allMediaTypes$;
  dataSource: TableDataSource;
  destroy$ = new Subject();
  spacerColumns = ['create-action', 'space1', 'space2', 'space3'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private speakerFacade: SpeakersFacade, private mediaTypeFacade: MediaTypesFacade, private media: MediaTypesService) { }

  ngOnInit() {
    this.speakerFacade.loadAll();
    // this.media.all();
    this.mediaTypeFacade.loadMediaTypes();
  }

  ngAfterViewInit() {
    if (this.sort && this.speaker$) {
      this.speaker$.pipe(
        filter((speaker: Speaker[]) => !!speaker.length),
        takeUntil(this.destroy$),
      ).subscribe((speaker: Speaker[]) => this.dataSource = new TableDataSource(speaker, this.sort, this.paginator));
    } else if (this.sort && this.mediaTypes$) {
      this.mediaTypes$.pipe(
        filter((mediaType: MediaType[]) => !!mediaType.length),
        takeUntil(this.destroy$),
      ).subscribe((mediaType: MediaType[]) => this.dataSource = new TableDataSource(mediaType, this.sort, this.paginator));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
