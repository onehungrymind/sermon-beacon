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
  selectedMediaId: null,
  isLoading: false
});

const mediaReducer = createReducer(
  initialState,
  on(MediaActions.selectedMedia, (state, { selectedMediaId }) =>
    Object.assign({}, state, { selectedMediaId })
  ),
  on(
    MediaActions.loadMedia,
    MediaActions.createMedia,
    MediaActions.updateMedia,
    MediaActions.deleteMedia,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
  on(MediaActions.mediaLoaded, (state, { media }) =>
    mediaAdapter.addAll(media, { ...state, isLoading: false })
  ),
  on(MediaActions.mediaCreated, (state, { media }) =>
    mediaAdapter.addOne(media, { ...state, isLoading: false })
  ),
  on(MediaActions.mediaUpdated, (state, { media }) =>
    mediaAdapter.upsertOne(media, { ...state, isLoading: false })
  ),
  on(MediaActions.mediaDeleted, (state, { media }) =>
    mediaAdapter.removeOne(media.id, { ...state, isLoading: false })
  )
);

export function reducer(state: MediaState | undefined, action: Action) {
  return mediaReducer(state, action);
}
