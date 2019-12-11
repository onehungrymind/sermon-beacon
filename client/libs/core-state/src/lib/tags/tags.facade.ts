import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromTags from './tags.reducer';
import * as TagsSelectors from './tags.selectors';
import * as TagsActions from './tags.actions';
import { Tag } from '@sb/core-data';

@Injectable()
export class TagsFacade {
  loaded$ = this.store.pipe(select(TagsSelectors.getTagsLoading));
  allTags$ = this.store.pipe(select(TagsSelectors.getAllTags));
  selectedTags$ = this.store.pipe(select(TagsSelectors.getSelected));

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
