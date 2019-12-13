import { createAction, props } from '@ngrx/store';

import { Speaker } from '@sb/core-data';

export const selectSpeaker = createAction(
  '[SPEAKER] Speaker Selected',
  props<{ selectedSpeakerId: string }>()
);

// Load Actions
export const loadSpeakers = createAction('[Speakers] Load Speakers');

export const speakersLoaded = createAction(
  '[SPEAKER] Speakers Successfully Loaded',
  props<{ speakers: Speaker[] }>()
);

// Create Actions
export const createSpeaker = createAction(
  '[SPEAKER] Create New Speaker',
  props<{ speaker: Speaker }>()
);

export const speakerCreated = createAction(
  '[SPEAKER] New Speaker Successfully Created',
  props<{ speaker: Speaker }>()
);

// Update Actions
export const updateSpeaker = createAction(
  '[SPEAKER] Update Speaker',
  props<{ speaker: Speaker }>()
);

export const speakerUpdated = createAction(
  '[SPEAKER] Speaker Successfully Updated',
  props<{ speaker: Speaker }>()
);

// Delete Actions
export const deleteSpeaker = createAction(
  '[SPEAKER] Delete Speaker',
  props<{ speaker: Speaker }>()
);

export const speakerDeleted = createAction(
  '[SPEAKER] Speaker Successfully Deleted',
  props<{ speaker: Speaker }>()
);
