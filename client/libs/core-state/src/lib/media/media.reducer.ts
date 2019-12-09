import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MediaActions from './media.actions';
import { MediaEntity } from './media.models';

export const MEDIA_FEATURE_KEY = 'media';

export interface MediaState extends EntityState<MediaEntity> {
  selectedId?: string | number; // which Media record has been selected
  loaded: boolean; // has the Media list been loaded
  error?: string | null; // last none error (if any)
}

export interface MediaPartialState {
  readonly [MEDIA_FEATURE_KEY]: MediaState;
}

export const mediaAdapter: EntityAdapter<MediaEntity> = createEntityAdapter<
  MediaEntity
>();

export const initialState: MediaState = mediaAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const mediaReducer = createReducer(
  initialState,
  on(MediaActions.loadMedia, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(MediaActions.loadMediaSuccess, (state, { media }) =>
    mediaAdapter.addAll(media, { ...state, loaded: true })
  ),
  on(MediaActions.loadMediaFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: MediaState | undefined, action: Action) {
  return mediaReducer(state, action);
}
