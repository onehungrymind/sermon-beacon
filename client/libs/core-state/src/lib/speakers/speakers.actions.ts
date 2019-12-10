import { createAction, props } from '@ngrx/store';

import { Speaker } from '@sb/core-data';

export const selectSpeaker = createAction(
  '[Speakers] Event',
  props<{ selectedSpeakerId: string}>()
);

// Load Actions
export const loadSpeakers = createAction('[Speakers] Load Speakers');

export const loadSpeakersSuccess = createAction(
  '[Speakers] Speakers Successfully Loaded',
  props<{ speakers: Speaker[] }>()
);

// Create Actions
export const createSpeaker = createAction(
  '[Speakers] Create New Speaker',
  props<{ speaker: Speaker }>()
);

export const createSpeakerSuccess = createAction(
  '[Speakers] New Speaker Successfully Created',
  props<{ speaker: Speaker }>()
);

// Update Actions
export const updateSpeaker = createAction(
  '[Speakers] Update Speaker',
  props<{ speaker: Speaker }>()
);

export const updateSpeakerSuccess = createAction(
  '[Speakers] Speaker Successfully Updated',
  props<{ speaker: Speaker }>()
);

// Delete Actions
export const deleteSpeaker = createAction(
  '[Speakers] Delete Speaker', props<{ speaker: Speaker }>()
);

export const deleteSpeakerSuccess = createAction(
  '[Speakers] Speaker Successfully Deleted',
  props<{ speaker: Speaker}>()
);