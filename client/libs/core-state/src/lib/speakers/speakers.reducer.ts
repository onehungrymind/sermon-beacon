import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as SpeakersActions from './speakers.actions';
import { Speaker } from '@sb/core-data';

export const SPEAKERS_FEATURE_KEY = 'speakers';

export interface SpeakersState extends EntityState<Speaker> {
  selectedSpeakerId?: string | number; // which Speakers record has been selected
  selectedSermonSpeakers?: Speaker[]; // only speakers for sermon
  isLoading: boolean; // has the Speakers list been loaded
}

export interface SpeakersPartialState {
  readonly [SPEAKERS_FEATURE_KEY]: SpeakersState;
}

export const speakersAdapter: EntityAdapter<Speaker> =
  createEntityAdapter<Speaker>();

export const initialState: SpeakersState = speakersAdapter.getInitialState({
  // set initial required properties
  selectedSpeakerId: null,
  selectedSermonSpeakers: [],
  isLoading: false
});

const speakersReducer = createReducer(
  initialState,
  on(SpeakersActions.speakerSelected, (state, { selectedSpeakerId }) =>
    Object.assign({}, state, { selectedSpeakerId })
  ),
  on(
    SpeakersActions.speakersLoaded,
    SpeakersActions.sermonSpeakersLoaded,
    (state, { speakers }) =>
    speakersAdapter.addAll(speakers, { ...state, loaded: true })
  ),
  on(SpeakersActions.speakersBySermonIdLoaded, (state, { speakers }) =>
    ({
      ...state,
      selectedSermonSpeakers: speakers,
      isLoading: false
    })
  ),
  on(SpeakersActions.speakerCreated, (state, { speaker }) =>
    speakersAdapter.addOne(speaker, { ...state, isLoading: false })
  ),
  on(SpeakersActions.speakerUpdated, (state, { speaker }) =>
    speakersAdapter.upsertOne(speaker, { ...state, isLoading: false })
  ),
  on(SpeakersActions.speakerDeleted, (state, { speaker }) =>
    speakersAdapter.removeOne(speaker.id, { ...state, isLoading: false })
  ),
  on(
    SpeakersActions.loadSpeakers,
    SpeakersActions.loadSermonSpeakers,
    SpeakersActions.loadSpeakersBySermonId,
    SpeakersActions.createSpeaker,
    SpeakersActions.updateSpeaker,
    SpeakersActions.deleteSpeaker,
    (state) => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducer(state: SpeakersState | undefined, action: Action) {
  return speakersReducer(state, action);
}
