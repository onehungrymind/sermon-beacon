import { createAction, props } from '@ngrx/store';

import { Media } from '@sb/core-data';

export const mediaSelected = createAction(
  '[MEDIA] Media Selected',
  props<{ selectedMediaId: string }>()
);

// Load Actions
export const loadMedia = createAction('[MEDIA] Load Media');

export const loadVideo = createAction('[MEDIA] Load Video');

export const loadMediaBySermonId = createAction(
  '[MEDIA] Load Media By Sermon Id',
  props<{ sermonId: string }>()
);

export const mediaLoaded = createAction(
  '[MEDIA] Media Loaded',
  props<{ media: Media[] }>()
);

export const mediaBySermonIdLoaded = createAction(
  '[MEDIA] Media By Sermon Id Loaded',
  props<{ media: Media[] }>()
);

// Create Actions
export const createMedia = createAction(
  '[MEDIA] Create New Media',
  props<{ media: Media }>()
);

export const mediaCreated = createAction(
  '[MEDIA] Media Created',
  props<{ media: Media }>()
);

// Update Actions
export const updateMedia = createAction(
  '[MEDIA] Update Media',
  props<{ media: Media }>()
);

export const mediaUpdated = createAction(
  '[MEDIA] Media Updated',
  props<{ media: Media }>()
);

// Delete Actions
export const deleteMedia = createAction(
  '[MEDIA] Delete Media',
  props<{ media: Media }>()
);

export const deleteMediaBySermonId = createAction(
  '[MEDIA] Delete Media By Sermon Id',
  props<{ sermonId: string }>()
);

export const mediaDeleted = createAction(
  '[MEDIA] Media Deleted',
  props<{ media: Media }>()
);

export const mediaBySermonIdDeleted = createAction(
  '[MEDIA] Media By Sermon Id Deleted',
  props<{ media: Media }>()
);
