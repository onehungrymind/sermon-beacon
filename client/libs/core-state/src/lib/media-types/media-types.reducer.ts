import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as MediaTypesActions from './media-types.actions';
import { MediaType } from '@sb/core-data';

export const MEDIATYPES_FEATURE_KEY = 'mediaTypes';

export interface MediaTypeState extends EntityState<MediaType> {
  selectedMediaTypeId?: string | number; // which MediaTypes record has been selected
  isLoading: boolean; // has the MediaTypes list been loaded
}

export interface MediaTypesPartialState {
  readonly [MEDIATYPES_FEATURE_KEY]: MediaTypeState;
}

export const mediaTypesAdapter: EntityAdapter<MediaType> = createEntityAdapter<
  MediaType
>({ selectId: (mediaType: MediaType) => mediaType.name });

export const initialState: MediaTypeState = mediaTypesAdapter.getInitialState({
  // set initial required properties
  selectedMediaTypeId: null,
  isLoading: false
});

const mediaTypesReducer = createReducer(
  initialState,
  on(MediaTypesActions.mediaTypeSelected, (state, { selectedMediaTypeId }) =>
    Object.assign({}, state, { selectedMediaTypeId })
  ),
  on(
    MediaTypesActions.loadMediaTypes,
    MediaTypesActions.createMediaType,
    MediaTypesActions.updateMediaType,
    MediaTypesActions.deleteMediaType,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
  on(MediaTypesActions.mediaTypeLoaded, (state, { mediaTypes }) =>
    mediaTypesAdapter.addAll(mediaTypes, { ...state, isLoading: false })
  ),
  on(MediaTypesActions.mediaTypeCreated, (state, { mediaType }) =>
    mediaTypesAdapter.addOne(mediaType, { ...state, isLoading: false })
  ),
  on(MediaTypesActions.mediaTypeUpdated, (state, { mediaType }) =>
    mediaTypesAdapter.upsertOne(mediaType, { ...state, isLoading: false })
  ),
  on(MediaTypesActions.mediaTypeDeleted, (state, { mediaType }) =>
    mediaTypesAdapter.removeOne(mediaType.name, { ...state, isLoading: false })
  )
);

export function reducer(state: MediaTypeState | undefined, action: Action) {
  return mediaTypesReducer(state, action);
}
