import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import * as moment from 'moment';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  categoryOptions = [
    { name: 'Sermon Title' },
    { name: 'Sermon Speaker' },
    { name: 'Sermon Date', icon: 'calendar_today' }
  ];

  constructor (private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  search(formValue) {
    console.log(formValue);
  }

  selectCustom(searchType: string, index = 0) {
    const datepickerOption = 2;

    this.form.patchValue({ searchType: searchType });

    if (index === datepickerOption) {
      this.datePicker.open();
      this.datePicker.closedStream.pipe(
        map(() => moment(this.datePicker._selected).format('MM/DD/YYYY')),
        tap((formattedDate: string) => this.form.get('searchQuery').patchValue(formattedDate)),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  clear(formDirective: NgForm) {
    formDirective.resetForm();
    this.form.patchValue({ searchType: 'Advanced' });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      searchQuery: [''],
      searchType: ['Advanced']
    });
  }
}
