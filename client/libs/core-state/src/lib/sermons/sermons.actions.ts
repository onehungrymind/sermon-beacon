import { createAction, props } from '@ngrx/store';

import { Sermon } from '@sb/core-data';

export const sermonSelected = createAction(
  '[Sermons] Sermon Selected',
  props<{ selectedSermonId: string }>()
);

// Load Actions
export const loadSermons = createAction('[Sermons] Load Sermons');

export const loadSermonsSuccess = createAction(
  '[Sermons] Sermons Successfully Loaded',
  props<{ sermons: Sermon[] }>()
);

// Create Actions
export const createSermon = createAction(
  '[Sermons] Create New Sermon',
  props<{ sermon: Sermon }>()
);

export const createSermonSuccess = createAction(
  '[Sermons] New Sermon Successfully Created',
  props<{ sermon: Sermon }>()
);

// Update Actions
export const updateSermon = createAction(
  '[Sermons] Update Sermon',
  props<{ sermon: Sermon }>()
);

export const updateSermonSuccess = createAction(
  '[Sermons] Sermon Successfully Updated',
  props<{ sermon: Sermon }>()
);

// Delete Actions
export const deleteSermon = createAction(
  '[Source] Delete Sermon',
  props<{ sermon: Sermon }>()
);

export const deleteSermonSuccess = createAction(
  '[Source] Sermon Successfully Deleted',
  props<{ sermon: Sermon }>()
);
