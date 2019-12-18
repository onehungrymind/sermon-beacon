import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';

import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';

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
  tags$: Observable<Tag[]> = this.tagsFacade.allTags$;

  constructor(private tagsFacade: TagsFacade) { }

  ngOnInit() {
    this.tagsFacade.loadTags();
  }

  add(tagEvent: any) {
    const existingTags = this.tagsGroup.get('tags').value || [];
    if (tagEvent.value) {
      let [property, value] = tagEvent.value.split(':');
      if (!value) {
        value = property;
      }
      this.tagsGroup.get('tags').patchValue([...existingTags, { property, value }]);
      tagEvent.input.value = '';
    } else {
      this.tagsGroup.get('tags').patchValue([...existingTags, tagEvent.option.value]);
    }
  }

  remove(tag: Tag) {
    const updatedSelectedTags = this.tagsGroup.get('tags').value
      .filter((selectedTag: Tag) => !(selectedTag.property === tag.property && selectedTag.value === tag.value));
    this.tagsGroup.get('tags').patchValue(updatedSelectedTags);
  }
}
