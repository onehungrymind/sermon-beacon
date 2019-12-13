import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromTags from './tags.reducer';
import * as TagsSelectors from './tags.selectors';
import * as TagsActions from './tags.actions';
import { Tag } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class TagsFacade {
  tagLoading$ = this.store.pipe(select(TagsSelectors.selectTagsLoading));
  allTags$ = this.store.pipe(select(TagsSelectors.selectAllTags));
  selectedTag$ = this.store.pipe(select(TagsSelectors.selectTag));

  constructor(private store: Store<fromTags.TagsPartialState>) {}

  selectTag(selectedTagId: string) {
    this.dispatch(TagsActions.selectedTag({ selectedTagId }));
  }

  loadTags() {
    this.dispatch(TagsActions.loadTags());
  }

  createTag(tag: Tag) {
    this.dispatch(TagsActions.createTag({ tag }));
  }

  updateTag(tag: Tag) {
    this.dispatch(TagsActions.updateTag({ tag }));
  }

  deleteTag(tag: Tag) {
    this.dispatch(TagsActions.deleteTag({ tag }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
