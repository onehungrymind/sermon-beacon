import { createAction, props } from '@ngrx/store';

import { Tag } from '@sb/core-data';

export const tagSelected = createAction(
  '[TAG] Tag Selected',
  props<{ selectedTagId: string }>()
);

// Load Actions
export const loadTags = createAction('[TAG] Load Tags');

export const loadTagsBySermonId = createAction(
  '[TAG] Load Tags By Sermon Id',
  props<{ sermonId: string }>()
);

export const tagsLoaded = createAction(
  '[TAG] Tags Loaded',
  props<{ tags: Tag[] }>()
);

export const tagsBySermonIdLoaded = createAction(
  '[TAG] Tags By Sermon Id Loaded',
  props<{ tags: Tag[] }>()
);

// Create Actions
export const createTag = createAction(
  '[TAG] Create Tag',
  props<{ tag: Tag }>()
);

export const tagCreated = createAction(
  '[TAG] Tag Created',
  props<{ tag: Tag }>()
);

// Update Actions
export const updateTag = createAction(
  '[TAG] Update Tag',
  props<{ tag: Tag }>()
);

export const updateTagBySermonId = createAction(
  '[TAG] Update Tag By Sermon Id',
  props<{ sermonId: string, tag: Tag }>()
);

export const tagUpdated = createAction(
  '[TAG] Tag Updated',
  props<{ tag: Tag }>()
);

export const tagBySermonIdUpdated = createAction(
  '[TAG] Tag By Sermon Id Updated',
  props<{ tag: Tag }>()
);

// Delete Actions
export const deleteTag = createAction(
  '[TAG] Delete Tag',
  props<{ tag: Tag }>()
);

export const tagDeleted = createAction(
  '[TAG] Tag Deleted',
  props<{ tag: Tag }>()
);
