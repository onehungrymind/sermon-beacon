import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-searchbar-actions',
  templateUrl: './searchbar-actions.component.html',
  styleUrls: ['./searchbar-actions.component.scss']
})
export class SearchbarActionsComponent {
  @Input() group: FormGroup;

  @Output() selected = new EventEmitter();
  @Output() cleared = new EventEmitter();

  categoryOptions = [
    { name: 'title' },
    { name: 'speaker' },
    { name: 'date', icon: 'calendar_today' }
  ];

  constructor() {}

  select(searchType: string, index = 0, event: MouseEvent) {
    this.selected.emit({ searchType, index });
    this.stopEventBubbling(event);
  }

  clear(event: MouseEvent) {
    this.cleared.emit();
    this.stopEventBubbling(event);
  }

  stopEventBubbling(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

}
