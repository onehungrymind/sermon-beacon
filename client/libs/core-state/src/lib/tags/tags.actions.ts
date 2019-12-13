import { createAction, props } from '@ngrx/store';

import { Tag } from '@sb/core-data';

export const selectedTag = createAction(
  '[TAG] Tag Selected',
  props<{ selectedTagId: string }>()
);

// Load Actions
export const loadTags = createAction('[Tags] Load Tags');

export const tagsLoaded = createAction(
  '[TAG] Loaded Successfully Tags',
  props<{ tags: Tag[] }>()
);

// Create Actions
export const createTag = createAction(
  '[TAG] Create New Tag',
  props<{ tag: Tag }>()
);

export const tagsCreated = createAction(
  '[TAG] New Tag Successfully Created',
  props<{ tag: Tag }>()
);

// Update Actions
export const updateTag = createAction(
  '[TAG] Update Tag',
  props<{ tag: Tag }>()
);

export const tagsUpdated = createAction(
  '[TAG] Tag Successfully Updated',
  props<{ tag: Tag }>()
);

// Delete Actions
export const deleteTag = createAction(
  '[TAG] Delete Tag',
  props<{ tag: Tag }>()
);

export const tagsDeleted = createAction(
  '[TAG] Tag Successfully Deleted',
  props<{ tag: Tag }>()
);
