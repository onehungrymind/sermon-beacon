import { createAction, props } from '@ngrx/store';
import { SpeakersEntity } from './speakers.models';

export const loadSpeakers = createAction('[Speakers] Load Speakers');

export const loadSpeakersSuccess = createAction(
  '[Speakers] Load Speakers Success',
  props<{ speakers: SpeakersEntity[] }>()
);

export const loadSpeakersFailure = createAction(
  '[Speakers] Load Speakers Failure',
  props<{ error: any }>()
);
