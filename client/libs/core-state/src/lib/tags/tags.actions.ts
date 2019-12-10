import { createAction, props } from '@ngrx/store';

import { Tag } from '@sb/core-data';

export const selectedTag = createAction(
  '[Tags] Tag Selected',
  props<{ selectedTagId: string }>()
);

// Load Actions
export const loadTags = createAction('[Tags] Load Tags');

export const loadTagsSuccess = createAction(
  '[Tags] Load Tags Success',
  props<{ tags: Tag[] }>()
);

// Create Actions
export const createTag = createAction(
  '[Tags] Create New Tag', props<{ tag: Tag }>()
);

export const createTagSuccess = createAction(
  '[Tags] New Tag Successfully Created',
  props<{ tag: Tag }>()
);

// Update Actions 
export const updateTag = createAction(
  '[Tags] Update Tag',
  props<{ tag: Tag }>()
);

export const updateTagSuccess = createAction(
  '[Tags] Tag Successfully Updated',
  props<{ tag: Tag }>()
);

// Delete Actions 
export const deleteTag = createAction(
  '[Tags] Delete Tag',
  props<{ tag: Tag }>()
);

export const deleteTagSuccess = createAction(
  '[Tags] Tag Successfully Deleted',
  props<{ tag: Tag }>());