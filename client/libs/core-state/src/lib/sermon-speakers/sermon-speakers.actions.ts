import { createAction, props } from '@ngrx/store';

import { SermonSpeaker } from '@sb/core-data';

export const sermonSpeakerSelected = createAction(
  '[SERMONSPEAKER] SermonSpeaker Selected',
  props<{ selectedSermonSpeakerId: string }>()
);

// Load Actions
export const loadSermonSpeakers = createAction('[SERMONSPEAKER] Load SermonSpeakers');

export const sermonSpeakersLoaded = createAction(
  '[SERMONSPEAKER] SermonSpeakers Loaded',
  props<{ sermonSpeakers: SermonSpeaker[] }>()
);

// Create Actions
export const createSermonSpeaker = createAction(
  '[SERMONSPEAKER] Create SermonSpeaker',
  props<{ sermonSpeaker: SermonSpeaker }>()
);

export const sermonSpeakerCreated = createAction(
  '[SERMONSPEAKER] SermonSpeaker Created',
  props<{ sermonSpeaker: SermonSpeaker }>()
);

// Update Actions
export const updateSermonSpeaker = createAction(
  '[SERMONSPEAKER] Update SermonSpeaker',
  props<{ sermonSpeaker: SermonSpeaker }>()
);

export const sermonSpeakerUpdated = createAction(
  '[SERMONSPEAKER] SermonSpeaker Updated',
  props<{ sermonSpeaker: SermonSpeaker }>()
);

// Delete Actions
export const deleteSermonSpeaker = createAction(
  '[SERMONSPEAKER] Delete SermonSpeaker',
  props<{ sermonSpeaker: SermonSpeaker }>()
);

export const sermonSpeakerDeleted = createAction(
  '[SERMONSPEAKER] SermonSpeaker Deleted',
  props<{ sermonSpeaker: SermonSpeaker }>()
);
