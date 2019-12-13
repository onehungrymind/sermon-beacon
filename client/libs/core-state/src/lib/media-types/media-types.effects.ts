import { Injectable } from '@angular/core';

import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromMediaTypes from './media-types.reducer';
import * as MediaTypesActions from './media-types.actions';
import { MediaTypesService, MediaType } from '@sb/core-data';
import { NotifyService } from '@sb/ui-libraries';

@Injectable()
export class MediaTypesEffects {
  loadMediaTypes$ = createEffect(() =>
    this.dataPersistence.fetch(MediaTypesActions.loadMediaTypes, {
      run: (
        action: ReturnType<typeof MediaTypesActions.loadMediaTypes>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        this.mediaTypeService
          .all()
          .pipe(
            map((res: MediaType[]) =>
              MediaTypesActions.mediaTypeLoaded({ mediaTypes: res })
            )
          );
      },

      onError: (
        action: ReturnType<typeof MediaTypesActions.loadMediaTypes>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.createMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.createMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        this.mediaTypeService
          .create(action.mediaType)
          .pipe(
            map((res: MediaType) =>
              MediaTypesActions.mediaTypeCreated({ mediaType: res })
            )
          );
      },

      onError: (
        action: ReturnType<typeof MediaTypesActions.createMediaType>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.updateMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.updateMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        this.mediaTypeService
          .update(action.mediaType)
          .pipe(
            map((res: MediaType) =>
              MediaTypesActions.mediaTypeUpdated({ mediaType: res })
            )
          );
      },

      onError: (
        action: ReturnType<typeof MediaTypesActions.updateMediaType>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.deleteMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.deleteMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        this.mediaTypeService
          .delete(action.mediaType)
          .pipe(
            map((res: MediaType) =>
              MediaTypesActions.mediaTypeDeleted({ mediaType: res })
            )
          );
      },

      onError: (
        action: ReturnType<typeof MediaTypesActions.deleteMediaType>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<
      fromMediaTypes.MediaTypesPartialState
    >,
    private mediaTypeService: MediaTypesService,
    private notifyService: NotifyService
  ) {}
}
