import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  MEDIATYPES_FEATURE_KEY,
  mediaTypesAdapter,
  MediaTypesPartialState,
  MediaTypeState
} from './media-types.reducer';

// Lookup the 'MediaTypes' feature state managed by NgRx
export const selectMediaTypesState = createFeatureSelector<
  MediaTypesPartialState,
  MediaTypeState
>(MEDIATYPES_FEATURE_KEY);

const { selectAll, selectEntities } = mediaTypesAdapter.getSelectors();

export const selectMediaTypesLoading = createSelector(
  selectMediaTypesState,
  (state: MediaTypeState) => state.isLoading
);

export const selectAllMediaTypes = createSelector(
  selectMediaTypesState,
  (state: MediaTypeState) => selectAll(state)
);

export const selectMediaTypesEntities = createSelector(
  selectMediaTypesState,
  (state: MediaTypeState) => selectEntities(state)
);

export const selectMediaTypeId = createSelector(
  selectMediaTypesState,
  (state: MediaTypeState) => state.selectedMediaTypeId
);

export const selectMediaType = createSelector(
  selectMediaTypesEntities,
  selectMediaTypeId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
