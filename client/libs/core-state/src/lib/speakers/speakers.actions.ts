import { createAction, props } from '@ngrx/store';

import { Speaker } from '@sb/core-data';

export const speakerSelected = createAction(
  '[SPEAKER] Speaker Selected',
  props<{ selectedSpeakerId: string }>()
);

// Load Actions
export const loadSpeakers = createAction('[SPEAKER] Load Speakers');

export const loadSpeakersBySermonId = createAction(
  '[SPEAKER] Load Speakers By Sermon Id',
  props<{ sermonId: string }>()
);

export const loadSermonSpeakers = createAction(
  '[SPEAKER] Load Sermon Speakers'
);

export const speakersLoaded = createAction(
  '[SPEAKER] Speakers Loaded',
  props<{ speakers: Speaker[] }>()
);

export const sermonSpeakersLoaded = createAction(
  '[SPEAKER] Sermon Speakers Loaded',
  props<{ speakers: Speaker[] }>()
);

export const speakersBySermonIdLoaded = createAction(
  '[SPEAKER] Speakers By Sermon Id Loaded',
  props<{ speakers: Speaker[] }>()
);

// Create Actions
export const createSpeaker = createAction(
  '[SPEAKER] Create Speaker',
  props<{ speaker: Speaker }>()
);

export const createSermonSpeaker = createAction(
  '[SPEAKER] Create Sermon Speaker',
  props<{ objects: {sermon_id: string, speaker_id: string} }>()
);

export const speakerCreated = createAction(
  '[SPEAKER] Speaker Created',
  props<{ speaker: Speaker }>()
);

export const sermonSpeakerCreated = createAction(
  '[SPEAKER] Sermon Speaker Created',
  props<{ speaker: Speaker }>()
);

// Update Actions
export const updateSpeaker = createAction(
  '[SPEAKER] Update Speaker',
  props<{ speaker: Speaker }>()
);

export const speakerUpdated = createAction(
  '[SPEAKER] Speaker Updated',
  props<{ speaker: Speaker }>()
);

// Delete Actions
export const deleteSpeaker = createAction(
  '[SPEAKER] Delete Speaker',
  props<{ speaker: Speaker }>()
);

export const deleteSermonSpeakers = createAction(
  '[SPEAKER] Delete Sermon Speakers',
  props<{ sermonId: string }>()
);

export const speakerDeleted = createAction(
  '[SPEAKER] Speaker Deleted',
  props<{ speaker: Speaker }>()
);

export const sermonSpeakersDeleted = createAction(
  '[SPEAKER] Sermon Speakers Deleted',
  props<{ speakers: Speaker[] }>()
);
