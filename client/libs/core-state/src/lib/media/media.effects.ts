import { Injectable } from '@angular/core';

import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromMedia from './media.reducer';
import * as MediaActions from './media.actions';
import { MediaService, Media } from '@sb/core-data';

@Injectable()
export class MediaEffects {
  loadMedia$ = createEffect(() =>
    this.dataPersistence.fetch(MediaActions.loadMedia, {
      run: (
        action: ReturnType<typeof MediaActions.loadMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.all().pipe(map((res: Media[]) => MediaActions.loadMediaSuccess({ media: res})));
      },

      onError: (action: ReturnType<typeof MediaActions.loadMedia>, error) => {
        console.error('Error', error);
      }
    })
  );

  addMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.createMedia, {
      run: (
        action: ReturnType<typeof MediaActions.createMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.create(action.media).pipe(map((res: Media) => MediaActions.createMediaSuccess({ media: res})));
      },

      onError: (action: ReturnType<typeof MediaActions.createMedia>, error) => {
        console.error('Error', error);
      }
    })
  );

  updateMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.updateMedia, {
      run: (
        action: ReturnType<typeof MediaActions.updateMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.update(action.media).pipe(map((res: Media) => MediaActions.updateMediaSuccess({ media: res})));
      },

      onError: (action: ReturnType<typeof MediaActions.updateMedia>, error) => {
        console.error('Error', error);
      }
    })
  );

  deleteMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.deleteMedia, {
      run: (
        action: ReturnType<typeof MediaActions.deleteMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.delete(action.media).pipe(map((res: Media) => MediaActions.deleteMediaSuccess({ media: res })));
      },

      onError: (action: ReturnType<typeof MediaActions.deleteMedia>, error) => {
        console.error('Error', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromMedia.MediaPartialState>,
    private mediaService: MediaService
  ) {}
}
