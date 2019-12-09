import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TagsActions from './tags.actions';
import { TagsEntity } from './tags.models';

export const TAGS_FEATURE_KEY = 'tags';

export interface TagsState extends EntityState<TagsEntity> {
  selectedId?: string | number; // which Tags record has been selected
  loaded: boolean; // has the Tags list been loaded
  error?: string | null; // last none error (if any)
}

export interface TagsPartialState {
  readonly [TAGS_FEATURE_KEY]: TagsState;
}

export const tagsAdapter: EntityAdapter<TagsEntity> = createEntityAdapter<
  TagsEntity
>();

export const initialState: TagsState = tagsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const tagsReducer = createReducer(
  initialState,
  on(TagsActions.loadTags, state => ({ ...state, loaded: false, error: null })),
  on(TagsActions.loadTagsSuccess, (state, { tags }) =>
    tagsAdapter.addAll(tags, { ...state, loaded: true })
  ),
  on(TagsActions.loadTagsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: TagsState | undefined, action: Action) {
  return tagsReducer(state, action);
}
