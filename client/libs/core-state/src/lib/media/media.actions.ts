import { createAction, props } from '@ngrx/store';

import { Media } from '@sb/core-data';

export const selectedMedia = createAction(
  '[Media] Media Selected',
  props<{ selectedMediaId: string }>()
);

// Load Actions
export const loadMedia = createAction(
  '[Media] Load Media'
);

export const loadMediaSuccess = createAction(
  '[Media] Load Media Success',
  props<{ media: Media[] }>()
);

// Create Actions
export const createMedia = createAction(
  '[Media] Create New Media',
  props<{ media: Media }>()
);

export const createMediaSuccess = createAction(
  '[Media] New Media Successfully Created',
  props<{ media: Media }>()
);

// Update Actions
export const updateMedia = createAction(
  '[Media] Update Media',
  props<{ media: Media }>()
);

export const updateMediaSuccess = createAction(
  '[Media] Media Successfully Updated',
  props<{ media: Media }>()
);

// Delete Actions
export const deleteMedia = createAction(
  '[Media] Delete Media',
  props<{ media: Media}>()
);

export const deleteMediaSuccess = createAction(
  '[Media] Media Successfully Deleted',
  props<{ media: Media }>()
);
