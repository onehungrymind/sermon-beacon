import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as fromMedia from './media.reducer';
import * as MediaActions from './media.actions';
import { Media, MediaService } from '@sb/core-data';
// tslint:disable-next-line: nx-enforce-module-boundaries
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

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromMedia.MediaPartialState>,
    private mediaService: MediaService,
    private notifyService: NotifyService,
    private dialogService: DialogService
  ) {}
}
