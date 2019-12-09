import { createAction, props } from '@ngrx/store';
import { TagsEntity } from './tags.models';

export const loadTags = createAction('[Tags] Load Tags');

export const loadTagsSuccess = createAction(
  '[Tags] Load Tags Success',
  props<{ tags: TagsEntity[] }>()
);

export const loadTagsFailure = createAction(
  '[Tags] Load Tags Failure',
  props<{ error: any }>()
);
