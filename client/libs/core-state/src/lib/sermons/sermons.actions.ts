import { createAction, props } from '@ngrx/store';

import { Sermon } from '@sb/core-data';

export const sermonSelected = createAction(
  '[SERMON] Sermon Selected',
  props<{ selectedSermonId: string }>()
);

// Load Actions
export const loadSermons = createAction('[Sermons] Load Sermons');

export const sermonsLoaded = createAction(
  '[SERMON] Sermons Successfully Loaded',
  props<{ sermons: Sermon[] }>()
);

// Create Actions
export const createSermon = createAction(
  '[SERMON] Create New Sermon',
  props<{ sermon: Sermon }>()
);

export const sermonCreated = createAction(
  '[SERMON] New Sermon Successfully Created',
  props<{ sermon: Sermon }>()
);

// Update Actions
export const updateSermon = createAction(
  '[SERMON] Update Sermon',
  props<{ sermon: Sermon }>()
);

export const sermonUpdated = createAction(
  '[SERMON] Sermon Successfully Updated',
  props<{ sermon: Sermon }>()
);

// Delete Actions
export const deleteSermon = createAction(
  '[SERMON] Delete Sermon',
  props<{ sermon: Sermon }>()
);

export const sermonDeleted = createAction(
  '[SERMON] Sermon Successfully Deleted',
  props<{ sermon: Sermon }>()
);
