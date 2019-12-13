import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromMedia from './media.reducer';
import * as MediaActions from './media.actions';
import { Media, MediaService } from '@sb/core-data';
import { NotifyService } from '@sb/ui-libraries';

@Injectable()
export class MediaEffects {
  loadMedia$ = createEffect(() =>
    this.dataPersistence.fetch(MediaActions.loadMedia, {
      run: (
        action: ReturnType<typeof MediaActions.loadMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService
          .all()
          .pipe(
            map((res: Media[]) => MediaActions.mediaLoaded({ media: res }))
          );
      },

      onError: (action: ReturnType<typeof MediaActions.loadMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.createMedia, {
      run: (
        action: ReturnType<typeof MediaActions.createMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService
          .create(action.media)
          .pipe(map((res: Media) => MediaActions.mediaCreated({ media: res })));
      },

      onError: (action: ReturnType<typeof MediaActions.createMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.updateMedia, {
      run: (
        action: ReturnType<typeof MediaActions.updateMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService
          .update(action.media)
          .pipe(map((res: Media) => MediaActions.mediaUpdated({ media: res })));
      },

      onError: (action: ReturnType<typeof MediaActions.updateMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteMedia$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.deleteMedia, {
      run: (
        action: ReturnType<typeof MediaActions.deleteMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService
          .delete(action.media)
          .pipe(map((res: Media) => MediaActions.mediaDeleted({ media: res })));
      },

      onError: (action: ReturnType<typeof MediaActions.deleteMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromMedia.MediaPartialState>,
    private mediaService: MediaService,
    private notifyService: NotifyService
  ) {}
}
