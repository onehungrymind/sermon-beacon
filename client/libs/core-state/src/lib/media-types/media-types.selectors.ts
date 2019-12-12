import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MEDIATYPES_FEATURE_KEY,
  MediaTypeState,
  MediaTypesPartialState,
  mediaTypesAdapter
} from './media-types.reducer';

// Lookup the 'MediaTypes' feature state managed by NgRx
export const getMediaTypesState = createFeatureSelector<
  MediaTypesPartialState,
  MediaTypeState
>(MEDIATYPES_FEATURE_KEY);

const { selectAll, selectEntities } = mediaTypesAdapter.getSelectors();

export const getMediaTypesLoading = createSelector(
  getMediaTypesState,
  (state: MediaTypeState) => state.isLoading
);

export const getAllMediaTypes = createSelector(
  getMediaTypesState,
  (state: MediaTypeState) => selectAll(state)
);

export const getMediaTypesEntities = createSelector(
  getMediaTypesState,
  (state: MediaTypeState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMediaTypesState,
  (state: MediaTypeState) => state.selectedMediaTypeId
);

export const getSelected = createSelector(
  getMediaTypesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
