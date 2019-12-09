import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { MediaPartialState } from './media.reducer';
import * as MediaActions from './media.actions';

@Injectable()
export class MediaEffects {
  loadMedia$ = createEffect(() =>
    this.dataPersistence.fetch(MediaActions.loadMedia, {
      run: (
        action: ReturnType<typeof MediaActions.loadMedia>,
        state: MediaPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return MediaActions.loadMediaSuccess({ media: [] });
      },

      onError: (action: ReturnType<typeof MediaActions.loadMedia>, error) => {
        console.error('Error', error);
        return MediaActions.loadMediaFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<MediaPartialState>
  ) {}
}
