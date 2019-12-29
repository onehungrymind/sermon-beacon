import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import * as moment from 'moment';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SermonsFacade } from '@sb/facades/sermons/sermons.facade';
import { BreakpointService } from '@sb/core-data';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnDestroy, OnInit {
  @ViewChild('picker', { static: false }) datePicker: MatDatepicker<any>;
  form: FormGroup;
  destroy$ = new Subject;
  isMobile: boolean = this.breakpointService.isMobile();
  categoryOptions = [
    { name: 'title' },
    { name: 'speaker' },
    { name: 'date', icon: 'calendar_today' }
  ];

  constructor (
    private formBuilder: FormBuilder,
    private sermonsFacade: SermonsFacade,
    private breakpointService: BreakpointService
  ) { }

  ngOnInit() {
    this.initForm();
    this.sermonsFacade.loadSermons();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  search() {
    this.sermonsFacade.searchSermons(this.form.value);
  }

  selectCustom(searchType: string, index = 0) {
    const datepickerOption = 2;

    this.form.patchValue({ searchType });

    if (index === datepickerOption) {
      this.patchSelectedDate();
    }
  }

  clear(formDirective: NgForm) {
    formDirective.resetForm();
    this.form.patchValue({ searchType: 'title', searchQuery: '' });
    this.searchSermons();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      searchQuery: [''],
      searchType: ['title']
    });
  }

  private patchSelectedDate() {
    this.datePicker.open();
    this.datePicker.closedStream.pipe(
      map(() => moment(this.datePicker._selected).format('MM/DD/YYYY')),
      map((formattedDate: string) => ({formattedDate, searchQueryGroup: this.form.get('searchQuery')})),
      tap(({formattedDate, searchQueryGroup}) => searchQueryGroup.patchValue(formattedDate)),
      tap(() => this.searchSermons()),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private searchSermons() {
    this.sermonsFacade.searchSermons(this.form.value);
  }
}
