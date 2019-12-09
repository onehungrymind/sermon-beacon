import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TAGS_FEATURE_KEY,
  TagsState,
  TagsPartialState,
  tagsAdapter
} from './tags.reducer';

// Lookup the 'Tags' feature state managed by NgRx
export const getTagsState = createFeatureSelector<TagsPartialState, TagsState>(
  TAGS_FEATURE_KEY
);

const { selectAll, selectEntities } = tagsAdapter.getSelectors();

export const getTagsLoaded = createSelector(
  getTagsState,
  (state: TagsState) => state.loaded
);

export const getTagsError = createSelector(
  getTagsState,
  (state: TagsState) => state.error
);

export const getAllTags = createSelector(
  getTagsState,
  (state: TagsState) => selectAll(state)
);

export const getTagsEntities = createSelector(
  getTagsState,
  (state: TagsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTagsState,
  (state: TagsState) => state.selectedId
);

export const getSelected = createSelector(
  getTagsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
