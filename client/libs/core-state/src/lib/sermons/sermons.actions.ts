import { createAction, props } from '@ngrx/store';
import { SermonsEntity } from './sermons.models';

export const loadSermons = createAction('[Sermons] Load Sermons');

export const loadSermonsSuccess = createAction(
  '[Sermons] Load Sermons Success',
  props<{ sermons: SermonsEntity[] }>()
);

export const loadSermonsFailure = createAction(
  '[Sermons] Load Sermons Failure',
  props<{ error: any }>()
);
