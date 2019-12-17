import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { Tag } from '@sb/core-data';
import { TagsFacade } from '@sb/core-state';

@Component({
  selector: 'sb-sermons-tags',
  templateUrl: './sermons-tags.component.html',
  styleUrls: ['./sermons-tags.component.scss']
})
export class SermonsTagsComponent implements OnInit {
  @Input() tagsGroup: FormGroup;
  @ViewChild('tagsInput', {static: false}) tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  allTags: Tag[];
  selectedTags: Tag[] = [];
  filteredTags: Observable<Tag[]>;
  tags$: Observable<Tag[]> = this.tagsFacade.allTags$;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private tagsFacade: TagsFacade) { }

  ngOnInit() {
    this.tagsFacade.loadTags();
    this.tags$.pipe(
      tap((tags: Tag[]) => this.allTags = tags)
      ).subscribe();
    this.filteredTags = this.tagsGroup.get('value').valueChanges.pipe(
      map((tag: Tag) => tag ? this.filterSelected(tag) : this.allTags.slice())
    );
  }

  add(event: MatChipInputEvent) {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our Tag
      if ((value || '').trim()) {
        this.selectedTags.push({value: value.trim()} as Tag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagsGroup.get('value').setValue(null);
    }
  }

  remove(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push({value: event.option.viewValue} as Tag);
    this.tagsInput.nativeElement.value = '';
    this.tagsGroup.get('value').setValue(null);
  }

  private filterSelected(tag: Tag) {
    return _.filter(this.allTags, tag);
  }

}
