import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import * as moment from 'moment';
import { map, take, tap } from 'rxjs/operators';

import { BreakpointService } from '@sb/core-data';
import { SermonSpeakersFacade } from '@sb/facades/sermon-speakers/sermon-speakers.facade';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnInit {
  @ViewChild('picker', { static: false }) datePicker: MatDatepicker<any>;

  form: FormGroup;
  isMobile: boolean = this.breakpointService.isMobile();

  constructor (
    private formBuilder: FormBuilder,
    private sermonSpeakersFacade: SermonSpeakersFacade,
    private breakpointService: BreakpointService
  ) { }

  ngOnInit() {
    this.initForm();
    this.sermonSpeakersFacade.loadSermonSpeakers();
  }

  searchSermons() {
    this.sermonSpeakersFacade.searchSermons(this.form.value);
  }

  selectCustom({ searchType, index }) {
    const datepickerOption = 2;

    if (index === datepickerOption) {
      this.patchSelectedDate();

      return;
    }

    this.form.patchValue({ searchType });
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
      tap((formattedDate) => this.form.patchValue({searchType: 'date', searchQuery: formattedDate})),
      tap(() => this.searchSermons()),
      take(1)
    ).subscribe();
  }
}
