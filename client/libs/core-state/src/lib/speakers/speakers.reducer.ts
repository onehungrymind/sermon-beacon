import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SpeakersActions from './speakers.actions';
import { Speaker } from '@sb/core-data';

export const SPEAKERS_FEATURE_KEY = 'speakers';

export interface SpeakersState extends EntityState<Speaker> {
  selectedId?: string | number; // which Speakers record has been selected
  isLoading: boolean; // has the Speakers list been loaded
}

export interface SpeakersPartialState {
  readonly [SPEAKERS_FEATURE_KEY]: SpeakersState;
}

export const speakersAdapter: EntityAdapter<Speaker> = createEntityAdapter<Speaker>();

export const initialState: SpeakersState = speakersAdapter.getInitialState({
  // set initial required properties
  selected: null,
  isLoading: false
});

const speakersReducer = createReducer(
  initialState,
  on(
    SpeakersActions.loadSpeakers,
    SpeakersActions.createSpeaker,
    SpeakersActions.updateSpeaker,
    SpeakersActions.deleteSpeaker,
    state => ({
    ...state,
    isLoading: false
  })),
  on(SpeakersActions.loadSpeakersSuccess, (state, { speakers }) =>
    speakersAdapter.addAll(speakers, { ...state, loaded: true })
  ),
  on(SpeakersActions.createSpeakerSuccess, (state, { speaker }) => ({
    speaker,
    ...state,
    isLoading: false
  })),
  on(SpeakersActions.updateSpeakerSuccess, (state, { speaker }) => ({
    speaker,
    ...state,
    isLoading: false
  })),
  on(SpeakersActions.deleteSpeaker, (state, { speaker }) => ({
    speaker,
    ...state,
    isLoading: false
  }))
);

export function reducer(state: SpeakersState | undefined, action: Action) {
  return speakersReducer(state, action);
}
