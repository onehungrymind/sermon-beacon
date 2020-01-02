import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SERMONSPEAKERS_FEATURE_KEY,
  sermonSpeakersAdapter,
  SermonSpeakersState
} from './sermon-speakers.reducer';

// Lookup the 'SermonSpeakers' feature state managed by NgRx
export const selectSermonSpeakersState = createFeatureSelector<SermonSpeakersState>(SERMONSPEAKERS_FEATURE_KEY);

const { selectAll, selectEntities } = sermonSpeakersAdapter.getSelectors();

export const selectSermonSpeakersLoading = createSelector(
  selectSermonSpeakersState,
  (state: SermonSpeakersState) => state.isLoading
);

export const selectAllSermonSpeakers = createSelector(
  selectSermonSpeakersState,
  (state: SermonSpeakersState) => selectAll(state)
);

export const selectSermonSpeakersEntities = createSelector(
  selectSermonSpeakersState,
  (state: SermonSpeakersState) => selectEntities(state)
);

export const selectSermonSpeakerId = createSelector(
  selectSermonSpeakersState,
  (state: SermonSpeakersState) => state.selectedSermonSpeakerId
);

export const selectSermonSpeaker = createSelector(
  selectSermonSpeakersEntities,
  selectSermonSpeakerId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
