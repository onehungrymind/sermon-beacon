import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MEDIA_FEATURE_KEY,
  MediaState,
  MediaPartialState,
  mediaAdapter
} from './media.reducer';

// Lookup the 'Media' feature state managed by NgRx
export const getMediaState = createFeatureSelector<
  MediaPartialState,
  MediaState
>(MEDIA_FEATURE_KEY);

const { selectAll, selectEntities } = mediaAdapter.getSelectors();

export const getMediaLoaded = createSelector(
  getMediaState,
  (state: MediaState) => state.loaded
);

export const getMediaError = createSelector(
  getMediaState,
  (state: MediaState) => state.error
);

export const getAllMedia = createSelector(
  getMediaState,
  (state: MediaState) => selectAll(state)
);

export const getMediaEntities = createSelector(
  getMediaState,
  (state: MediaState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMediaState,
  (state: MediaState) => state.selectedId
);

export const getSelected = createSelector(
  getMediaEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
