import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MediaActions from './media.actions';
import { Media } from '@sb/core-data';

export const MEDIA_FEATURE_KEY = 'media';

export interface MediaState extends EntityState<Media> {
  selectedId?: string | number; // which Media record has been selected
  isLoading: boolean; // has the Media list been loaded
}

export interface MediaPartialState {
  readonly [MEDIA_FEATURE_KEY]: MediaState;
}

export const mediaAdapter: EntityAdapter<Media> = createEntityAdapter<Media>();

export const initialState: MediaState = mediaAdapter.getInitialState({
  // set initial required properties
  selected: null,
  isLoading: false
});

const mediaReducer = createReducer(
  initialState,
  on(MediaActions.selectedMedia, (state, { selectedMediaId }) =>
    Object.assign({}, state, { selectedMediaId })
  ),
  on(MediaActions.loadMedia, state => ({
    ...state,
    isLoading: false
  })),
  on(MediaActions.loadMediaSuccess, (state, { media }) =>
    mediaAdapter.addAll(media, { ...state, loaded: true })
  ),
  on(MediaActions.createMediaSuccess, (state, { media }) => ({
    media,
    ...state,
    isLoading: false
  })),
  on(MediaActions.updateMediaSuccess, (state, { media }) => ({
    media,
    ...state,
    isLoading: false
  })),
  on(MediaActions.deleteMediaSuccess, (state, { media }) => ({
    media,
    ...state,
    isLoading: false
  }))
);

export function reducer(state: MediaState | undefined, action: Action) {
  return mediaReducer(state, action);
}
