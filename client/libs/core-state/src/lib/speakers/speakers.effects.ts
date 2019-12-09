import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { SpeakersPartialState } from './speakers.reducer';
import * as SpeakersActions from './speakers.actions';

@Injectable()
export class SpeakersEffects {
  loadSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakers, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        state: SpeakersPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return SpeakersActions.loadSpeakersSuccess({ speakers: [] });
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        error
      ) => {
        console.error('Error', error);
        return SpeakersActions.loadSpeakersFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SpeakersPartialState>
  ) {}
}
