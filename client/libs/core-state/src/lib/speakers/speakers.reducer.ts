import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SpeakersActions from './speakers.actions';
import { SpeakersEntity } from './speakers.models';

export const SPEAKERS_FEATURE_KEY = 'speakers';

export interface SpeakersState extends EntityState<SpeakersEntity> {
  selectedId?: string | number; // which Speakers record has been selected
  loaded: boolean; // has the Speakers list been loaded
  error?: string | null; // last none error (if any)
}

export interface SpeakersPartialState {
  readonly [SPEAKERS_FEATURE_KEY]: SpeakersState;
}

export const speakersAdapter: EntityAdapter<
  SpeakersEntity
> = createEntityAdapter<SpeakersEntity>();

export const initialState: SpeakersState = speakersAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const speakersReducer = createReducer(
  initialState,
  on(SpeakersActions.loadSpeakers, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SpeakersActions.loadSpeakersSuccess, (state, { speakers }) =>
    speakersAdapter.addAll(speakers, { ...state, loaded: true })
  ),
  on(SpeakersActions.loadSpeakersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: SpeakersState | undefined, action: Action) {
  return speakersReducer(state, action);
}
