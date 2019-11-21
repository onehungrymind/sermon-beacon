import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  form: FormGroup;
  categoryOptions = [
    { name: 'Sermon Title' },
    { name: 'Sermon Speaker' },
    { name: 'Sermon Date', icon: 'calendar_today' }
  ];
  @ViewChild('picker', {static: false}) datePicker;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  selectCustom(searchType: string, index = 0) {
    this.form.patchValue({ searchType: searchType })
    
    if (index === 2) {
      this.datePicker.open();
    }
  }

  clear() {
    this.form.reset();
    this.form.patchValue({searchType: 'Advanced'})
  }

  private initForm(): void {
    this.form = this.fb.group({
      search: ['', Validators.compose([Validators.required])],
      searchType: ['Advanced']
    });
  }
}
