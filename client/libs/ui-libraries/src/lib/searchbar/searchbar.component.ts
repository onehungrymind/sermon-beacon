import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  form: FormGroup;
  webView: boolean;
  categoryOptions = [
    { name: 'Sermon Title' },
    { name: 'Sermon Speaker' },
    { name: 'Sermon Date', icon: 'calendar_today' }
  ];
  @ViewChild('picker', { static: false }) datePicker: MatDatepicker<any>;

  constructor (
    private fb: FormBuilder,
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.initForm();
    this.initMobileView();
  }

  search(formValue) {
    console.log(formValue);
  }

  selectCustom(searchType: string, index = 0) {
    const datepickerOption = 2;
    this.form.patchValue({ searchType: searchType });

    if (index === datepickerOption) {
      this.datePicker.open();
    }
  }

  clear(formDirective: NgForm) {
    formDirective.resetForm();
    this.form.patchValue({ searchType: 'Advanced' });
  }

  private initMobileView() {
    this.breakpointObserver
      .observe(['(min-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.webView = true;
        } else {
          this.webView = false;
        }
      });
  }

  private initForm(): void {
    this.form = this.fb.group({
      search: [''],
      searchType: ['Advanced']
    });
  }
}
