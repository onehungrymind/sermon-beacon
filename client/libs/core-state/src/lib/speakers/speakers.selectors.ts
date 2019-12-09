import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SPEAKERS_FEATURE_KEY,
  SpeakersState,
  SpeakersPartialState,
  speakersAdapter
} from './speakers.reducer';

// Lookup the 'Speakers' feature state managed by NgRx
export const getSpeakersState = createFeatureSelector<
  SpeakersPartialState,
  SpeakersState
>(SPEAKERS_FEATURE_KEY);

const { selectAll, selectEntities } = speakersAdapter.getSelectors();

export const getSpeakersLoaded = createSelector(
  getSpeakersState,
  (state: SpeakersState) => state.loaded
);

export const getSpeakersError = createSelector(
  getSpeakersState,
  (state: SpeakersState) => state.error
);

export const getAllSpeakers = createSelector(
  getSpeakersState,
  (state: SpeakersState) => selectAll(state)
);

export const getSpeakersEntities = createSelector(
  getSpeakersState,
  (state: SpeakersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSpeakersState,
  (state: SpeakersState) => state.selectedId
);

export const getSelected = createSelector(
  getSpeakersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
