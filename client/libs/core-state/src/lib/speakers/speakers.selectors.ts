import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SPEAKERS_FEATURE_KEY,
  speakersAdapter,
  SpeakersState
} from './speakers.reducer';

// Lookup the 'Speakers' feature state managed by NgRx
export const selectSpeakersState = createFeatureSelector<SpeakersState>(SPEAKERS_FEATURE_KEY);

const { selectAll, selectEntities } = speakersAdapter.getSelectors();

export const selectSpeakersLoading = createSelector(
  selectSpeakersState,
  (state: SpeakersState) => state.isLoading
);

export const selectAllSpeakers = createSelector(
  selectSpeakersState,
  (state: SpeakersState) => selectAll(state)
);

export const selectedSpeakers = createSelector(
  selectSpeakersState,
  (state: SpeakersState) => state.selectedSpeakers
);

export const selectSpeakersEntities = createSelector(
  selectSpeakersState,
  (state: SpeakersState) => selectEntities(state)
);

export const selectSpeakerId = createSelector(
  selectSpeakersState,
  (state: SpeakersState) => state.selectedSpeakerId
);

export const selectSpeaker = createSelector(
  selectSpeakersEntities,
  selectSpeakerId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
