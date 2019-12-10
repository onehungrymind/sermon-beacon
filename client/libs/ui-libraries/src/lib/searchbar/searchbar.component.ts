import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: [ './searchbar.component.scss' ]
})

export class SearchbarComponent implements OnInit {
  form: FormGroup;
  categoryOptions = [
    { name: 'Sermon Title' },
    { name: 'Sermon Speaker' },
    { name: 'Sermon Date', icon: 'calendar_today' }
  ];
  @ViewChild('picker', { static: false }) datePicker: MatDatepicker<any>;

  constructor (
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  selectCustom(searchType: string, index = 0) {
    this.form.patchValue({ searchType: searchType })

    if (index === 2) {
      this.datePicker.open();
    }
  }

  clear(formDirective: NgForm) {
    formDirective.resetForm();
    this.form.patchValue({ searchType: 'Advanced' })
  }

  private initForm(): void {
    this.form = this.fb.group({
      search: [''],
      searchType: [ 'Advanced' ]
    });
  }
}
