import { createAction, props } from '@ngrx/store';

import { MediaType } from '@sb/core-data';

export const selectedMediaType = createAction(
  '[MEDIATYPE] Selected MediaType',
  props<{ selectedMediaTypeId: string }>()
);

// Load Actions
export const loadMediaTypes = createAction('[MediaTypes] Load MediaTypes');

export const mediaTypeLoaded = createAction(
  '[MEDIATYPE] MediaTypes Loaded',
  props<{ mediaTypes: MediaType[] }>()
);

// Create Actions
export const createMediaType = createAction(
  '[MEDIATYPE] Create MediaType',
  props<{ mediaType: MediaType }>()
);

export const mediaTypeCreated = createAction(
  '[MEDIATYPE] New MediaType Successfully Created',
  props<{ mediaType: MediaType }>()
);

// Update Actions
export const updateMediaType = createAction(
  '[MEDIATYPE] Update MediaType',
  props<{ mediaType: MediaType }>()
);

export const mediaTypeUpdated = createAction(
  '[MEDIATYPE] MediaType Successfully Updated',
  props<{ mediaType: MediaType }>()
);

// Delete Actions
export const deleteMediaType = createAction(
  '[MEDIATYPE] Delete MediaType',
  props<{ mediaType: MediaType }>()
);

export const mediaTypeDeleted = createAction(
  '[MEDIATYPE] MediaType Successfully Deleted',
  props<{ mediaType: MediaType }>()
);
