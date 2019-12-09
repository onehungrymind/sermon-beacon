import { createAction, props } from '@ngrx/store';
import { MediaEntity } from './media.models';

export const loadMedia = createAction('[Media] Load Media');

export const loadMediaSuccess = createAction(
  '[Media] Load Media Success',
  props<{ media: MediaEntity[] }>()
);

export const loadMediaFailure = createAction(
  '[Media] Load Media Failure',
  props<{ error: any }>()
);
