import { createAction, props } from '@ngrx/store';

import { MediaType } from '@sb/core-data';

export const selectedMedia = createAction(
  '[MediaTypes] Selected MediaType',
  props<{ selectedMediaTypeId: string }>()
);

// Load Actions
export const loadMediaTypes = createAction('[MediaTypes] Load MediaTypes');

export const loadMediaTypesSuccess = createAction(
  '[MediaTypes] MediaTypes Successfully Loaded',
  props<{ mediaTypes: MediaType[] }>()
);

// Create Actions
export const createMediaType = createAction(
  '[MediaTypes] Create New MediaType',
  props<{ mediaType: MediaType }>()
);

export const createMediaTypeSuccess = createAction(
  '[MediaTypes] New MediaType Successfully Created',
  props<{ mediaType: MediaType }>()
);

// Update Actions
export const updateMediaType = createAction(
  '[MediaTypes] Update MediaType',
  props<{ mediaType: MediaType }>()
);

export const updateMediaTypeSuccess = createAction(
  '[MediaTypes] MediaType Successfully Updated',
  props<{ mediaType: MediaType }>()
);

// Delete Actions
export const deleteMediaType = createAction(
  '[MediaTypes] Delete MediaType',
  props<{ mediaType: MediaType }>()
);

export const deleteMediaTypeSuccess = createAction(
  '[MediaTypes] MediaType Successfully Deleted',
  props<{ mediaType: MediaType }>()
);
