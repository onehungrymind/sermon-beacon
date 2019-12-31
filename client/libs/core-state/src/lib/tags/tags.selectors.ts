import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  TAGS_FEATURE_KEY,
  tagsAdapter,
  TagsState
} from './tags.reducer';

// Lookup the 'Tags' feature state managed by NgRx
export const selectTagsState = createFeatureSelector<TagsState>(TAGS_FEATURE_KEY);

const { selectAll, selectEntities } = tagsAdapter.getSelectors();

export const selectTagsLoading = createSelector(
  selectTagsState,
  (state: TagsState) => state.isLoading
);

export const selectAllTags = createSelector(
  selectTagsState,
  (state: TagsState) => selectAll(state)
);

export const selectedTags = createSelector(
  selectTagsState,
  (state: TagsState) => state.selectedTags
);

export const selectTagsEntities = createSelector(
  selectTagsState,
  (state: TagsState) => selectEntities(state)
);

export const selectTagId = createSelector(
  selectTagsState,
  (state: TagsState) => state.selectedTagId
);

export const selectTag = createSelector(
  selectTagsEntities,
  selectTagId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
