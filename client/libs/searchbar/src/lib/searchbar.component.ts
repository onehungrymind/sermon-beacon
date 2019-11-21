import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  searchMode: string;
  categoryOptions = [
    { name: 'Title' },
    { name: 'Speaker' },
    { name: 'Date', icon: 'calendar_today' }
  ];

  constructor() {}

  ngOnInit() {
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
    console.log('this btn works')
  }
}
