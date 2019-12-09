import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { SermonsPartialState } from './sermons.reducer';
import * as SermonsActions from './sermons.actions';

@Injectable()
export class SermonsEffects {
  loadSermons$ = createEffect(() =>
    this.dataPersistence.fetch(SermonsActions.loadSermons, {
      run: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        state: SermonsPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return SermonsActions.loadSermonsSuccess({ sermons: [] });
      },

      onError: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        error
      ) => {
        console.error('Error', error);
        return SermonsActions.loadSermonsFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SermonsPartialState>
  ) {}
}
