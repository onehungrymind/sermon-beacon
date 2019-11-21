import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  form: FormGroup
  searchMode: string;
  categoryOptions = [
    { name: 'Title' },
    { name: 'Speaker' },
    { name: 'Date', icon: 'calendar_today' }
  ];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.selectCustom();
  }

  selectCustom(value = 'default') {
    this.searchMode = value;
  }

  searchText() {
    if (this.searchMode === 'default') {
      return 'Advanced';
    }
    return `Sermon ${this.searchMode}`;
  }

  clear() {
    this.form.reset();
  }

  private initForm(): void {
    this.form = this.fb.group({
      input: ['', Validators.compose([Validators.required])],
      filter: ['', Validators.compose([Validators.required])]
    });
  }
}
