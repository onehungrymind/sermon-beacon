import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as sermonSpeakersActions from './sermon-speakers.actions';
import { SermonSpeaker } from '@sb/core-data';

export const SERMONSPEAKERS_FEATURE_KEY = 'sermon_speakers';

export interface SermonSpeakersState extends EntityState<SermonSpeaker> {
  selectedSermonSpeakerId?: string | number;
  isLoading: boolean;
}

export interface SermonSpeakersPartialState {
  readonly [SERMONSPEAKERS_FEATURE_KEY]: SermonSpeakersState;
}

export const sermonSpeakersAdapter: EntityAdapter<SermonSpeaker> = createEntityAdapter<SermonSpeaker>();

export const initialState: SermonSpeakersState = sermonSpeakersAdapter.getInitialState({
  // set initial required properties
  selectedSermonSpeakerId: null,
  isLoading: false
});

const sermonSpeakersReducer = createReducer(
  initialState,
  on(sermonSpeakersActions.sermonSpeakerSelected, (state, { selectedSermonSpeakerId }) =>
    Object.assign({}, state, { selectedSermonSpeakerId })
  ),
  on(sermonSpeakersActions.sermonSpeakersLoaded, (state, { sermonSpeakers }) =>
    sermonSpeakersAdapter.addAll(sermonSpeakers, { ...state, isLoading: false })
  ),
  on(sermonSpeakersActions.sermonSpeakerCreated, (state, { sermonSpeaker }) =>
    sermonSpeakersAdapter.addOne(sermonSpeaker, { ...state, isLoading: false })
  ),
  on(sermonSpeakersActions.sermonSpeakerUpdated, (state, { sermonSpeaker }) =>
    sermonSpeakersAdapter.upsertOne(sermonSpeaker, { ...state, isLoading: false })
  ),
  on(sermonSpeakersActions.sermonSpeakerDeleted, (state, { sermonSpeaker }) =>
    sermonSpeakersAdapter.removeOne(sermonSpeaker.id, { ...state, isLoading: false })
  ),
  on(
    sermonSpeakersActions.loadSermonSpeakers,
    sermonSpeakersActions.createSermonSpeaker,
    sermonSpeakersActions.updateSermonSpeaker,
    sermonSpeakersActions.deleteSermonSpeaker,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: SermonSpeakersState | undefined, action: Action) {
  return sermonSpeakersReducer(state, action);
}
