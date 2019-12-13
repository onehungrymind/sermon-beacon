import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  MEDIA_FEATURE_KEY,
  MediaState,
  MediaPartialState,
  mediaAdapter
} from './media.reducer';

// Lookup the 'Media' feature state managed by NgRx
export const selectMediaState = createFeatureSelector<
  MediaPartialState,
  MediaState
>(MEDIA_FEATURE_KEY);

const { selectAll, selectEntities } = mediaAdapter.getSelectors();

export const selectMediaLoading = createSelector(
  selectMediaState,
  (state: MediaState) => state.isLoading
);

export const selectAllMedia = createSelector(
  selectMediaState,
  (state: MediaState) => selectAll(state)
);

export const selectMediaEntities = createSelector(
  selectMediaState,
  (state: MediaState) => selectEntities(state)
);

export const selectMediaId = createSelector(
  selectMediaState,
  (state: MediaState) => state.selectedMediaId
);

export const selectMedia = createSelector(
  selectMediaEntities,
  selectMediaId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
