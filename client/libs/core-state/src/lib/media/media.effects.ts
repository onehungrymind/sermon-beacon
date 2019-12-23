import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as fromMedia from './media.reducer';
import * as MediaActions from './media.actions';
import { Media, MediaService } from '@sb/core-data';
import { DialogService, NotifyService } from '@sb/ui-libraries';
import { EMPTY, iif } from 'rxjs';

@Injectable()
export class MediaEffects {
  loadMedia$ = createEffect(() =>
    this.dataPersistence.fetch(MediaActions.loadMedia, {
      run: (
        action: ReturnType<typeof MediaActions.loadMedia>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.all().pipe(
          map((media: Media[]) => MediaActions.mediaLoaded({ media }))
        );
      },
      onError: (action: ReturnType<typeof MediaActions.loadMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  loadMediaBySermonId$ = createEffect(() =>
    this.dataPersistence.fetch(MediaActions.loadMediaBySermonId, {
      run: (
        action: ReturnType<typeof MediaActions.loadMediaBySermonId>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.allBySermonId(action.sermonId).pipe(
          map((media: Media[]) => MediaActions.mediaBySermonIdLoaded({ media }))
        );
      },
      onError: (action: ReturnType<typeof MediaActions.loadMediaBySermonId>, error) => {
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
        return this.mediaService.create(action.media).pipe(
          map((media: Media) => MediaActions.mediaCreated({ media }))
        );
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
        return this.mediaService.update(action.media).pipe(
          map((media: Media) => MediaActions.mediaUpdated({ media }))
        );
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
        return this.dialogService.deleteDialog(action.media, 'media').pipe(
          switchMap((deleteConfirmed: boolean) =>
            iif(() => deleteConfirmed,
              this.mediaService.delete(action.media).pipe(
                map((media: Media) => MediaActions.mediaDeleted({ media }))
              ),
              EMPTY
            )
          )
        );
      },
      onError: (action: ReturnType<typeof MediaActions.deleteMedia>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteMediaBySermonId$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaActions.deleteMediaBySermonId, {
      run: (
        action: ReturnType<typeof MediaActions.deleteMediaBySermonId>,
        state: fromMedia.MediaPartialState
      ) => {
        return this.mediaService.deleteBySermonId(action.sermonId).pipe(
          map((media: Media) => MediaActions.mediaBySermonIdDeleted({ media }))
        );
      },
      onError: (action: ReturnType<typeof MediaActions.deleteMediaBySermonId>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromMedia.MediaPartialState>,
    private mediaService: MediaService,
    private notifyService: NotifyService,
    private dialogService: DialogService
  ) {}
}
