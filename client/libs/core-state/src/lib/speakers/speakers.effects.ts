import { Injectable } from '@angular/core';

import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as SpeakersActions from './speakers.actions';
import { SpeakersPartialState } from './speakers.reducer';
import { SpeakersService, Speaker } from '@sb/core-data';

@Injectable()
export class SpeakersEffects {
  loadSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakers, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        state: SpeakersPartialState
      ) => {
        this.speakersService.all().pipe(map((res: Speaker[]) => SpeakersActions.loadSpeakersSuccess({ speakers: res })));
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        error
      ) => {
        console.error('Error', error);
      }
    })
  );

  addSpeaker$ = createEffect(() => 
    this.dataPersistence.pessimisticUpdate(SpeakersActions.createSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.createSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.create(action.speaker)
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.createSpeaker>,
        error
      ) => {
        console.error('Error', error);
      }
    })
  ); 

  updateSpeaker$ = createEffect(() => 
    this.dataPersistence.pessimisticUpdate(SpeakersActions.updateSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.updateSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.update(action.speaker)
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.updateSpeaker>,
        error
      ) => {
        console.error('Error', error);
      }
    })
  );

  deleteSpeaker$ = createEffect(() => 
    this.dataPersistence.pessimisticUpdate(SpeakersActions.deleteSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.deleteSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.delete(action.speaker)
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.deleteSpeaker>,
        error
      ) => {
        console.error('Error', error);
      }
    })
  ); 

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SpeakersPartialState>,
    private speakersService: SpeakersService
  ) {}
}
