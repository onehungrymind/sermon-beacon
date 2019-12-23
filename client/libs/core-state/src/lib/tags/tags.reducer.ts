import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as TagsActions from './tags.actions';
import { Tag } from '@sb/core-data';

export const TAGS_FEATURE_KEY = 'tags';

export interface TagsState extends EntityState<Tag> {
  selectedTagId?: string | number; // which Tags record has been selected
  selectedSermonTags?: Tag[]; // only tags for sermon
  isLoading: boolean; // has the Tags list been loaded
}

export interface TagsPartialState {
  readonly [TAGS_FEATURE_KEY]: TagsState;
}

export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState: TagsState = tagsAdapter.getInitialState({
  // set initial required properties
  selectedTagId: null,
  selectedSermonTags: [],
  isLoading: false
});

const tagsReducer = createReducer(
  initialState,
  on(TagsActions.tagSelected, (state, { selectedTagId }) =>
    Object.assign({}, state, { selectedTagId })
  ),
  on(TagsActions.tagsLoaded, (state, { tags }) =>
    tagsAdapter.addAll(tags, { ...state, isLoading: true })
  ),
  on(TagsActions.tagsBySermonIdLoaded, (state, { tags }) =>
    ({
      ...state,
      selectedSermonTags: tags,
      isLoading: false
    })
  ),
  on(TagsActions.tagCreated, (state, { tag }) =>
    tagsAdapter.addOne(tag, { ...state, isLoading: false })
  ),
  on(TagsActions.tagUpdated, (state, { tag }) =>
    tagsAdapter.upsertOne(tag, { ...state, isLoading: false })
  ),
  on(TagsActions.tagDeleted, (state, { tag }) =>
    tagsAdapter.removeOne(tag.id, { ...state, isLoading: false })
  ),
  on(
    TagsActions.loadTags,
    TagsActions.loadTagsBySermonId,
    TagsActions.createTag,
    TagsActions.updateTag,
    TagsActions.deleteTag,
    (state) => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducer(state: TagsState | undefined, action: Action) {
  return tagsReducer(state, action);
}
