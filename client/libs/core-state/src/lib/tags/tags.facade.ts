import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromTags from './tags.reducer';
import * as TagsSelectors from './tags.selectors';
import * as TagsActions from './tags.actions';
import { Tag } from '@sb/core-data';

@Injectable({ providedIn: 'root' })
export class TagsFacade {
  allTags$ = this.store.pipe(select(TagsSelectors.selectAllTags));
  selectedTags$ = this.store.pipe(select(TagsSelectors.selectedTags));
  selectedTag$ = this.store.pipe(select(TagsSelectors.selectTag));
  tagLoading$ = this.store.pipe(select(TagsSelectors.selectTagsLoading));

  constructor(private store: Store<fromTags.TagsPartialState>) {}

  selectTag(selectedTagId: string) {
    this.dispatch(TagsActions.tagSelected({ selectedTagId }));
  }

  loadTags() {
    this.dispatch(TagsActions.loadTags());
  }

  loadTagsBySermonId(sermonId: string) {
    this.dispatch(TagsActions.loadTagsBySermonId({ sermonId }));
  }

  createTag(tag: Tag) {
    this.dispatch(TagsActions.createTag({ tag }));
  }

  createSermonTags(objects: {sermon_id: string, tag: {data: Partial<Tag>}}) {
    this.dispatch(TagsActions.createSermonTags({ objects }));
  }

  updateTag(tag: Tag) {
    this.dispatch(TagsActions.updateTag({ tag }));
  }

  updateTagBySermonId(sermonId: string, tag: Tag) {
    this.dispatch(TagsActions.updateTagBySermonId({ sermonId, tag }));
  }

  deleteTag(tag: Tag) {
    this.dispatch(TagsActions.deleteTag({ tag }));
  }

  deleteSermonTags(sermonId: string) {
    this.dispatch(TagsActions.deleteSermonTags({ sermonId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
