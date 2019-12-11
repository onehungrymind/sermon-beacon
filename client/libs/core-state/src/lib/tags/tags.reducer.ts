import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TagsActions from './tags.actions';
import { Tag } from '@sb/core-data';

export const TAGS_FEATURE_KEY = 'tags';

export interface TagsState extends EntityState<Tag> {
  selectedTagId?: string | number; // which Tags record has been selected
  isLoading: boolean; // has the Tags list been loaded
}

export interface TagsPartialState {
  readonly [TAGS_FEATURE_KEY]: TagsState;
}

export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState: TagsState = tagsAdapter.getInitialState({
  // set initial required properties
  selected: null,
  isLoading: false
});

const tagsReducer = createReducer(
  initialState,
  on(TagsActions.selectedTag, (state, { selectedTagId }) =>
    Object.assign({}, state, { selectedTagId })
  ),
  on(
    TagsActions.loadTags,
    TagsActions.createTag,
    TagsActions.updateTag,
    TagsActions.deleteTag,
    (state) => ({
      ...state,
      isLoading: false
    })
  ),
  on(TagsActions.loadTagsSuccess, (state, { tags }) =>
    tagsAdapter.addAll(tags, { ...state, isLoading: true })
  ),
  on(TagsActions.createTagSuccess, (state, { tag }) => ({
    tag,
    ...state,
    isLoading: false
  })),
  on(TagsActions.updateTagSuccess, (state, { tag }) => ({
    tag,
    ...state,
    isLoading: false
  })),
  on(TagsActions.deleteTag, (state, { tag }) => ({
    tag,
    ...state,
    isLoading: false
  }))
);

export function reducer(state: TagsState | undefined, action: Action) {
  return tagsReducer(state, action);
}
