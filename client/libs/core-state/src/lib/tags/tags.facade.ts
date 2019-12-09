import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromTags from './tags.reducer';
import * as TagsSelectors from './tags.selectors';
import * as TagsActions from './tags.actions';

@Injectable()
export class TagsFacade {
  loaded$ = this.store.pipe(select(TagsSelectors.getTagsLoaded));
  allTags$ = this.store.pipe(select(TagsSelectors.getAllTags));
  selectedTags$ = this.store.pipe(select(TagsSelectors.getSelected));

  constructor(private store: Store<fromTags.TagsPartialState>) {}

  loadAll() {
    this.store.dispatch(TagsActions.loadTags());
  }
}
